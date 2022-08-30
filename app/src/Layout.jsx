import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Copyright from "./components/Copyright";
import { LogoButton } from "./components/LogoButton";
import { useMediaQuery } from "@mui/material";
import { useIsScreenshot } from "./hooks/useIsScreenshot";

export default function Layout({ children }) {
  const mediaQueryMatch = useMediaQuery((theme) => theme.breakpoints.up("xl"));
  const isScreenshot = useIsScreenshot();
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        {children}
        {!mediaQueryMatch && (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <LogoButton />
          </Box>
        )}
        <Box sx={{ mt: 4 }}>
          <Copyright sx={{ mt: 4 }} />
        </Box>
      </Box>
      {mediaQueryMatch && !isScreenshot && (
        <LogoButton style={{ position: "fixed", bottom: 0, left: 0 }} />
      )}
    </Container>
  );
}
