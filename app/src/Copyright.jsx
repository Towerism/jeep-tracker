import * as React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://martinfrackerjr.com/" target="_blank">
        Martin Fracker, Jr.
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}
