import { Box, Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getOrderStatus } from "~/models/orderStatus.server";

export const loader = async ({ params }) => {
  const { von, lastName } = params;
  const result = await getOrderStatus(von, lastName);
  return json(result);
};

function BasicStatusCard({ title, children }) {
  return (
    <Card sx={{ minWidth: 150 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="div">
          {children}
        </Typography>
      </CardContent>
    </Card>
  );
}

function DocumentCard({ title, url, found }) {
  return (
    <BasicStatusCard title={title}>
      {found ? <a href={url}>Found</a> : "Not yet"}
    </BasicStatusCard>
  );
}

export default function OrderStatus() {
  const {
    image,
    statusCode,
    statusDesc,
    vehicle,
    von,
    vin,
    windowStickerFound,
    windowStickerUrl,
    buildSheetFound,
    buildSheetUrl,
  } = useLoaderData();
  return (
    <main>
      <Box>
        <Grid container>
          <Grid sx={{ textAlign: "center" }} md={6}>
            <img src={image} alt={vehicle} style={{ width: "90%" }} />
          </Grid>
          <Grid md={6}>
            <Grid container spacing={2}>
              <Grid>
                <BasicStatusCard title="Order number">{von}</BasicStatusCard>
              </Grid>
              <Grid>
                <BasicStatusCard title="Current status">
                  {statusCode} - {statusDesc}
                </BasicStatusCard>
              </Grid>
              <Grid md={8}>
                <BasicStatusCard title="VIN">{vin}</BasicStatusCard>
              </Grid>
              <Grid md={5}>
                <DocumentCard
                  title="Window sticker"
                  found={windowStickerFound}
                  url={windowStickerUrl}
                />
              </Grid>
              <Grid md={5}>
                <DocumentCard
                  title="Build sheet"
                  found={buildSheetFound}
                  url={buildSheetUrl}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </main>
  );
}
