import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const von = formData.get("von");
  const lastName = formData.get("lastName");

  return redirect(`/order-status/${von}/${lastName}`);
};

export default function Index() {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Get your order status
        </Typography>
        <Box component={Form} method="post" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="von"
            label="VON"
            name="von"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="lastName"
            label="Last name"
            id="lastName"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Get my order status
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
