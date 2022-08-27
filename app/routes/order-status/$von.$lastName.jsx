import { Box, Typography, Chip } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { BasicStatusCard } from "~/src/BasicStatusCard";
import { DocumentCard } from "~/src/DocumentCard";
import { MilestoneTimeline } from "~/src/MilestoneTimeline";

import { getOrderStatus } from "~/models/orderStatus.server";

export const loader = async ({ params }) => {
  const { von, lastName } = params;
  const result = await getOrderStatus(von, lastName);
  return json(result);
};

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
    modelName,
    modelYear,
    brandName,
    specModel,
    trimCode,
    timeline,
    arrivalDate,
    paintCode,
    interiorCode,
    dealer,
    rpoCodes,
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
              <BasicStatusCard title="Order number">{von}</BasicStatusCard>
              <BasicStatusCard title="Last milestone">
                {statusCode} - {statusDesc}
              </BasicStatusCard>
              <BasicStatusCard title="VIN" md={8}>
                {vin}
              </BasicStatusCard>
              <DocumentCard
                title="Window sticker"
                found={windowStickerFound}
                url={windowStickerUrl}
                md={5}
              />
              <DocumentCard
                title="Build sheet"
                found={buildSheetFound}
                url={buildSheetUrl}
                md={5}
              />
              {arrivalDate && (
                <BasicStatusCard title="Est. arrival" md={5}>
                  {arrivalDate}
                </BasicStatusCard>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid sx={{ mt: 4 }} md={6}>
            <Typography align="center" variant="h4" gutterBottom>
              Vehicle specs
            </Typography>
            <Grid container spacing={2}>
              <BasicStatusCard title="Year">{modelYear}</BasicStatusCard>
              <BasicStatusCard title="Make">{brandName}</BasicStatusCard>
              <BasicStatusCard title="Model code">{specModel}</BasicStatusCard>
              <BasicStatusCard title="Trim code">{trimCode}</BasicStatusCard>
              <BasicStatusCard title="Model">{modelName}</BasicStatusCard>
              <BasicStatusCard title="Interior code">
                {interiorCode}
              </BasicStatusCard>
              <BasicStatusCard title="Paint code">{paintCode}</BasicStatusCard>
            </Grid>
          </Grid>
          <Grid sx={{ mt: 4 }} md={6}>
            <Typography align="center" variant="h4" gutterBottom>
              Milestones
            </Typography>
            <MilestoneTimeline timeline={timeline} />
          </Grid>
        </Grid>
        <Grid container>
          <Grid sx={{ my: 4 }} xs={12}>
            <Typography align="center" variant="h4" gutterBottom>
              Option codes
            </Typography>
          </Grid>
          <Grid container spacing={2} justifyContent="center" xs={12}>
            {rpoCodes.map((rpo) => (
              <Chip key={rpo} label={rpo} sx={{ mr: 1, my: 1 }} />
            ))}
          </Grid>
        </Grid>
        <Grid container>
          <Grid sx={{ my: 4 }} xs={12}>
            <Typography align="center" variant="h4" gutterBottom>
              Dealership
            </Typography>
            <Typography align="center" variant="h5" gutterBottom>
              {dealer.name}
            </Typography>
          </Grid>
          <Grid container spacing={2} justifyContent="center" xs={12}>
            <BasicStatusCard title="Address">{dealer.address}</BasicStatusCard>
            <BasicStatusCard title="City">{dealer.city}</BasicStatusCard>
            <BasicStatusCard title="State">{dealer.state}</BasicStatusCard>
            <BasicStatusCard title="Zip">{dealer.zip}</BasicStatusCard>
            <BasicStatusCard title="Phone number">
              {dealer.phoneNumber}
            </BasicStatusCard>
          </Grid>
        </Grid>
      </Box>
    </main>
  );
}
