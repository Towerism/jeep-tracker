import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Container } from "@mui/system";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getOrderStatus } from "~/models/orderStatus.server";

export const loader = async ({ params }) => {
  const { von, lastName } = params;
  const result = await getOrderStatus(von, lastName);
  return json(result);
};

export default function OrderStatus() {
  const { image, statusCode, statusDesc } = useLoaderData();
  return (
    <main>
      <Box>
        <Grid container>
          <Grid sx={{textAlign: "center"}}>
            <img src={image} style={{width: "90%"}} />
          </Grid>
          <Grid>
            {statusCode}: {statusDesc}
          </Grid>
        </Grid>
      </Box>
    </main>
  );
}
