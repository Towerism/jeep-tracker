import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { BasicStatusCard } from "~/src/components/BasicStatusCard";

export function VehicleSpecs({ vehicleSpecs }) {
  const {
    modelYear,
    brandName,
    specModel,
    trimCode,
    modelName,
    interiorCode,
    paintCode,
  } = vehicleSpecs;
  return (
    <Grid container spacing={2} justifyContent="center">
      <BasicStatusCard title="Year">{modelYear}</BasicStatusCard>
      <BasicStatusCard title="Make">{brandName}</BasicStatusCard>
      <BasicStatusCard title="Model code">{specModel}</BasicStatusCard>
      <BasicStatusCard title="Trim code">{trimCode}</BasicStatusCard>
      <BasicStatusCard title="Model" md={10}>
        {modelName}
      </BasicStatusCard>
      <BasicStatusCard title="Interior code">{interiorCode}</BasicStatusCard>
      <BasicStatusCard title="Paint code">{paintCode}</BasicStatusCard>
    </Grid>
  );
}
