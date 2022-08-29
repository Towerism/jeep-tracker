import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { json } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";

import { BasicStatusCard } from "~/src/BasicStatusCard";
import { BasicTrackingData } from "~/src/BasicTrackingData";
import { MilestoneTimeline } from "~/src/MilestoneTimeline";

import { getOrderStatus } from "~/models/orderStatus.server";
import { VehicleOptionCodes } from "~/src/VehicleOptionCodes";
import { useRef } from "react";
import { LogoButton } from "~/src/LogoButton";
import { useIsScreenshot } from "~/src/useIsScreenshot";

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
    statusUpdateDate,
  } = useLoaderData();

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
  const { lastName } = useParams();
  const isScreenshot = useIsScreenshot();

  const onGenerateCanvas = async (von, lastName) => {
    const link = document.createElement("a");
    link.target = "_blank";
    link.href = `/screenshot/${von}/${lastName}`;
    link.click();
  };

  return (
    <main>
      <Box>
        <Box sx={{ textAlign: "center" }}>
          <Button onClick={() => onGenerateCanvas(von, lastName)}>
            Screenshot
          </Button>
        </Box>
        <Grid container ref={mainRef} id="screenshot-hook">
          <Grid container>
            <Grid md={6}>
              {isScreenshot && <LogoButton />}
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
