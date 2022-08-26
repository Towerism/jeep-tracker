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

export default function OrderStatus() {
  const { image, statusCode, statusDesc, vehicle, von, vin } = useLoaderData();
  return (
    <main>
      <Box>
        <Grid container>
          <Grid sx={{ textAlign: "center" }}>
            <img src={image} alt={vehicle} style={{ width: "90%" }} />
          </Grid>
          <Grid>
            <Grid container>
              <Grid>
                <BasicStatusCard title="Order number">{von}</BasicStatusCard>
              </Grid>
              <Grid>
                <BasicStatusCard title="Order status">
                  {statusCode} - {statusDesc}
                </BasicStatusCard>
              </Grid>
              <Grid>
                <BasicStatusCard title="VIN">{vin}</BasicStatusCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </main>
  );
}
