import { Box, Button, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { BasicStatusCard } from "~/src/BasicStatusCard";
import { BasicTrackingData } from "~/src/BasicTrackingData";
import { MilestoneTimeline } from "~/src/MilestoneTimeline";

import { getOrderStatus } from "~/models/orderStatus.server";
import { VehicleOptionCodes } from "~/src/VehicleOptionCodes";
import { useRef } from "react";
import html2canvas from "html2canvas";

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
  const theme = useTheme();

  function watermarkedDataURL(canvas, text) {
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    tempCtx.drawImage(canvas, 0, 0);
    const fontPx = 48;
    tempCtx.font = `${fontPx}px verdana`;
    tempCtx.globalAlpha = 0.5;
    tempCtx.fillStyle = "white";
    const padding = { x: 10, y: 20 };
    tempCtx.fillText(text, padding.x, padding.y + fontPx / 2);
    tempCtx.fillStyle = "black";
    const shadowOffset = 2;
    tempCtx.fillText(
      text,
      padding.x + shadowOffset,
      padding.y + shadowOffset + fontPx / 2
    );
    return tempCanvas.toDataURL("image/png;base64");
  }

  const onGenerateCanvas = async () => {
    const canvas = await html2canvas(mainRef.current, {
      allowTaint: true,
      backgroundColor: theme.palette.background.default,
    });
    const dataUrl = watermarkedDataURL(canvas, "JeepOnOrder.com");
    const link = document.createElement("a");
    link.download = "status.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <main>
      <Box>
        <Box sx={{ textAlign: "center" }}>
          <Button onClick={onGenerateCanvas}>Screenshot</Button>
        </Box>
        <Grid container ref={mainRef}>
          <Grid container>
            <Grid sx={{ textAlign: "center" }} md={6}>
              <img src={image} alt={vehicle} style={{ width: "90%" }} />
            </Grid>
            <Grid md={6}>
              <BasicTrackingData data={basicTrackingData} />
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
