import { Box, Button, Typography, Skeleton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { BasicTrackingData } from "~/src/components/BasicTrackingData";
import { MilestoneTimeline } from "~/src/components/MilestoneTimeline";

import { VehicleOptionCodes } from "~/src/components/VehicleOptionCodes";
import { useRef } from "react";
import { LogoButton } from "~/src/components/LogoButton";
import { useIsScreenshot } from "~/src/hooks/useIsScreenshot";
import { VehicleSpecs } from "./VehicleSpecs";
import { Dealership } from "./Dealership";

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
    paintCode,
    interiorCode,
    timeline,
    arrivalDate,
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

  const vehicleSpecs = {
    modelName,
    modelYear,
    brandName,
    specModel,
    trimCode,
    paintCode,
    interiorCode,
  };

  const mainRef = useRef();
  const isScreenshot = useIsScreenshot();

  return (
    <main>
      <Box>
        {statusCode && (
          <Box sx={{ textAlign: "center" }}>
            {lastName && (
              <Button href={`/screenshot/${von}/${lastName}`} target="_blank">
                Take screenshot
              </Button>
            )}
          </Box>
        )}
        <Grid container ref={mainRef} id="screenshot-hook" sx={{ padding: 2 }}>
          <Grid container sx={{ width: "100%" }}>
            <Grid md={6}>
              {isScreenshot && <LogoButton big sx={{ float: true }} />}
              {image ? (
                <img src={image} alt={vehicle} style={{ width: "90%" }} />
              ) : (
                <>
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width="90%"
                    height={200}
                  />
                  <Box sx={{ width: 700, display: "hidden", mb: 2 }}>
                    &nbsp;
                  </Box>
                </>
              )}
            </Grid>
            <Grid md={6}>
              {basicTrackingData.statusCode ? (
                <BasicTrackingData
                  data={basicTrackingData}
                  hideSensitiveData={isScreenshot}
                />
              ) : (
                <Skeleton variant="rounded" animation="wave" width="90%">
                  <BasicTrackingData data={basicTrackingData} />
                </Skeleton>
              )}
            </Grid>
          </Grid>
          <Grid container justifyContent="center" sx={{ width: "100%" }}>
            <Grid sx={{ mt: 4 }} md={6}>
              <Typography align="center" variant="h4" gutterBottom>
                Vehicle specs
              </Typography>
              {vehicleSpecs.modelName ? (
                <VehicleSpecs vehicleSpecs={vehicleSpecs} />
              ) : (
                <Skeleton variant="rounded" animation="wave" width="90%">
                  <VehicleSpecs vehicleSpecs={vehicleSpecs} />
                </Skeleton>
              )}
            </Grid>
            <Grid sx={{ mt: 4 }} md={6}>
              <Typography align="center" variant="h4" gutterBottom>
                Milestones
              </Typography>
              {timeline ? (
                <MilestoneTimeline timeline={timeline} />
              ) : (
                <Box sx={{ textAlign: "center" }}>
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width="70%"
                    height={500}
                    sx={{ display: "inline-block" }}
                  />
                </Box>
              )}
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
            {dealer.name ? (
              <Dealership dealer={dealer} />
            ) : (
              <Skeleton
                variant="rounded"
                animation="wave"
                width="70%"
                height={100}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </main>
  );
}
