import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { BasicStatusCard } from "~/src/components/BasicStatusCard";
import { BasicTrackingData } from "~/src/components/BasicTrackingData";
import { MilestoneTimeline } from "~/src/components/MilestoneTimeline";

import { VehicleOptionCodes } from "~/src/components/VehicleOptionCodes";
import { useRef } from "react";
import { LogoButton } from "~/src/components/LogoButton";
import { useIsScreenshot } from "~/src/hooks/useIsScreenshot";

export function OrderStatus({ orderStatus, lastName }) {
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
    dealer = {},
    rpoCodes,
    statusUpdateDate,
  } = orderStatus;

  const basicTrackingData = {
    von,
    statusCode,
    statusDesc,
    vin,
    windowStickerFound,
    windowStickerUrl,
    buildSheetFound,
    buildSheetUrl,
    arrivalDate,
    statusUpdateDate,
  };

  const mainRef = useRef();
  const isScreenshot = useIsScreenshot();

  return (
    <main>
      <Box>
        <Box sx={{ textAlign: "center" }}>
          <Button href={`/screenshot/${von}/${lastName}`} target="_blank">
            Take screenshot
          </Button>
        </Box>
        <Grid container ref={mainRef} id="screenshot-hook" sx={{ padding: 2 }}>
          <Grid container>
            <Grid md={6}>
              {isScreenshot && <LogoButton big sx={{ float: true }} />}
              <Box sx={{ textAlign: "center" }}>
                <img src={image} alt={vehicle} style={{ width: "90%" }} />
              </Box>
            </Grid>
            <Grid md={6}>
              <BasicTrackingData
                data={basicTrackingData}
                hideSensitiveData={isScreenshot}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid sx={{ mt: 4 }} md={6}>
              <Typography align="center" variant="h4" gutterBottom>
                Vehicle specs
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                <BasicStatusCard title="Year">{modelYear}</BasicStatusCard>
                <BasicStatusCard title="Make">{brandName}</BasicStatusCard>
                <BasicStatusCard title="Model code">
                  {specModel}
                </BasicStatusCard>
                <BasicStatusCard title="Trim code">{trimCode}</BasicStatusCard>
                <BasicStatusCard title="Model" md={10}>
                  {modelName}
                </BasicStatusCard>
                <BasicStatusCard title="Interior code">
                  {interiorCode}
                </BasicStatusCard>
                <BasicStatusCard title="Paint code">
                  {paintCode}
                </BasicStatusCard>
              </Grid>
            </Grid>
            <Grid sx={{ mt: 4 }} md={6}>
              <Typography align="center" variant="h4" gutterBottom>
                Milestones
              </Typography>
              <MilestoneTimeline timeline={timeline} />
            </Grid>
          </Grid>
          <VehicleOptionCodes rpoCodes={rpoCodes} />
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
