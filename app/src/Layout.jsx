import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Copyright from "./Copyright";
import { LogoButton } from "./LogoButton";
import { useMediaQuery } from "@mui/material";
import { useIsScreenshot } from "./useIsScreenshot";

export default function Layout({ children }) {
  const mdAndUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const isScreenshot = useIsScreenshot;
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        {children}
        {!mdAndUp && (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <LogoButton />
          </Box>
        )}
        <Box sx={{ mt: 4 }}>
          <Copyright sx={{ mt: 4 }} />
        </Box>
      </Box>
      {mdAndUp && !isScreenshot && (
        <LogoButton style={{ position: "fixed", bottom: 0, left: 0 }} />
      )}
    </Container>
  );
}
