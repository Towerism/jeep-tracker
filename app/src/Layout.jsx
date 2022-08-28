import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Copyright from "./Copyright";
import { LogoButton } from "./LogoButton";

export default function Layout({ children }) {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        {children}
        <Box sx={{ mt: 4 }}>
          <Copyright sx={{ mt: 4 }} />
        </Box>
      </Box>
      <LogoButton />
    </Container>
  );
}
