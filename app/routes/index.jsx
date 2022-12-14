import { json, redirect } from "@remix-run/node";
import {
  Form,
  useParams,
  useTransition,
  useLoaderData,
} from "@remix-run/react";
import * as React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { OrderStatus } from "~/src/components/OrderStatus";
import { Alert } from "@mui/material";
import { deobfuscateSearchParams } from "~/src/obfuscateSearchParams";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const von = formData.get("von");
  const lastName = formData.get("lastName");

  return redirect(`/order-status/${von}/${lastName}`);
};

export const loader = ({ request }) => {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  const {
    error = "",
    von = "",
    lastName = "",
  } = token ? deobfuscateSearchParams(token) : {};

  return json({ error, von, lastName });
};

export const meta = () => {
  return { title: "JeepOnOrder.com" };
};

export default function Index() {
  const transition = useTransition();
  const params = useParams();
  const { error, von, lastName } = useLoaderData();

  return transition.submission ? (
    <OrderStatus
      orderStatus={Object.fromEntries(transition.submission.formData)}
      lastName={params.lastName}
    />
  ) : (
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
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        <Box component={Form} method="post" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="von"
            label="Your vehicle order number"
            name="von"
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={von}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="lastName"
            InputLabelProps={{
              shrink: true,
            }}
            label="Last name or business name"
            id="lastName"
            defaultValue={lastName}
          />
          <LoadingButton
            type="submit"
            loading={transition.state !== "idle"}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Get my order status
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
}
