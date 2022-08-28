import { BasicStatusCard } from "./BasicStatusCard";
import { DocumentCard } from "./DocumentCard";
import Grid from "@mui/material/Unstable_Grid2";

export function BasicTrackingData({ data }) {
  const {
    von,
    statusCode,
    statusDesc,
    vin,
    windowStickerFound,
    windowStickerUrl,
    buildSheetFound,
    buildSheetUrl,
    arrivalDate,
  } = data;
  return (
    <Grid container spacing={2}>
      <BasicStatusCard title="Order number">{von}</BasicStatusCard>
      <BasicStatusCard title="Last milestone">
        {statusCode} - {statusDesc}
      </BasicStatusCard>
      <BasicStatusCard title="VIN" md={8}>
        {vin ? vin : "Not yet"}
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
  );
}
