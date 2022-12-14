import * as React from "react";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import { withEmotionCache } from "@emotion/react";
import {
  Box,
  Link,
  Typography,
  unstable_useEnhancedEffect,
} from "@mui/material";
import theme from "./src/theme";
import ClientStyleContext from "./src/ClientStyleContext";
import Layout from "./src/Layout";
import * as gtag from "~/src/gtags.client";
import { useIsScreenshot } from "./src/hooks/useIsScreenshot";

export const loader = async () => {
  return json({
    gaTrackingId: process.env.GA_TRACKING_ID,
  });
};

const useEnhancedEffect =
  typeof window !== "undefined" ? unstable_useEnhancedEffect : React.useEffect;

const Document = withEmotionCache(
  ({ children, title, isError }, emotionCache) => {
    const clientStyleData = React.useContext(ClientStyleContext);
    const location = useLocation();
    let gaTrackingId = "";
    if (!isError) {
      const data = useLoaderData();
      gaTrackingId = data?.gaTrackingId ?? "";
    }
    const isScreenshot = useIsScreenshot();

    // Only executed on client
    useEnhancedEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        // eslint-disable-next-line no-underscore-dangle
        emotionCache.sheet._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData.reset();
    }, []);

    React.useEffect(() => {
      if (gaTrackingId?.length) {
        gtag.pageview(location.pathname, gaTrackingId);
      }
    }, [location, gaTrackingId]);

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <meta name="theme-color" content={theme.palette.primary.main} />
          {title ? <title>{title}</title> : null}
          <Meta />
          <Links />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <meta
            name="emotion-insertion-point"
            content="emotion-insertion-point"
          />
        </head>
        <body>
          {process.env.NODE_ENV === "development" || !gaTrackingId ? null : (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
              />
              <script
                async
                id="gtag-init"
                dangerouslySetInnerHTML={{
                  __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaTrackingId}', {
                  page_path: window.location.pathname,
                });
              `,
                }}
              />
            </>
          )}
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
);

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }) {
  return (
    <Document title="Error!" isError={true}>
      <Layout>
        <div>
          <h1>There was an error.</h1>
          <p>We're not sure what happened...</p>
          <hr />
          <p>Sorry for the inconvenience! Please try again later.</p>
        </div>
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  const caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <Box sx={{ textAlign: "center" }}>
          <h1>
            {caught.status}: {caught.statusText}
          </h1>
          <Typography variant="body1">{message}</Typography>
          <Link href="/">Take me home!</Link>
        </Box>
      </Layout>
    </Document>
  );
}
