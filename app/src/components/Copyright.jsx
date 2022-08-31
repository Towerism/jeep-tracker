import * as React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

export default function Copyright() {
  return (
    <Box>
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link
          color="inherit"
          href="https://martinfrackerjr.com/"
          target="_blank"
        >
          Martin Fracker, Jr.
        </Link>{" "}
        {new Date().getFullYear()}
        {". "}
        <Link
          color="inherit"
          href="https://github.com/towerism/jeep-tracker"
          target="_blank"
        >
          Source
        </Link>
        .
      </Typography>
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Typography variant="caption" color="InactiveCaptionText">
          JeepOnOrder.com is not affiliated with Jeep® or Chrysler Group LLC.
          Jeep is a registered trademark of Chrysler Group LLC.
        </Typography>
      </Box>
    </Box>
  );
}
