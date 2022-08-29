import { BasicStatusCard } from "./BasicStatusCard";
import { DocumentCard } from "./DocumentCard";
import Grid from "@mui/material/Unstable_Grid2";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Switch } from "./Switch";

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

  const { daysUntilArrival, daysSinceLastMilestone } = calculateDays(data);

  const [displayVin, setDisplayVin] = useState(vin);
  const [hideVon, setHideVon] = useState(false);
  const [hideVin, setHideVin] = useState(false);

  useEffect(() => {
    if (!vin) {
      setDisplayVin("Not yet");
    } else if (hideVin) {
      setDisplayVin(`xxxxxxxxxxx${vin.slice(11)}`);
    } else {
      setDisplayVin(vin);
    }
  }, [vin, hideVin]);

  return (
    <Box>
      <Box align="center" data-html2canvas-ignore>
        <Switch
          label="Hide VON"
          onChange={(event) => setHideVon(event.target.checked)}
        />
        <Switch
          label="Hide VIN"
          onChange={(event) => setHideVin(event.target.checked)}
        />
      </Box>
      <Grid container spacing={2} justifyContent="center">
        <BasicStatusCard title="Order number" md={5}>
          {hideVon ? "Hidden" : von}
        </BasicStatusCard>
        <BasicStatusCard title="Last milestone" md={5}>
          {statusCode} - {statusDesc}
        </BasicStatusCard>
        <BasicStatusCard title="Days since last milestone" md={10}>
          {daysSinceLastMilestone} days ago
        </BasicStatusCard>
        <BasicStatusCard title="VIN" md={10}>
          {displayVin}
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
        {arrivalDate && (
          <BasicStatusCard title="Est. days to arrival" md={5}>
            In {daysUntilArrival} days
          </BasicStatusCard>
        )}
      </Grid>
    </Box>
  );
}

function calculateDays({ arrivalDate, statusUpdateDate }) {
  const arrival = DateTime.fromISO(arrivalDate);
  const lastUpdate = DateTime.fromISO(statusUpdateDate);
  const now = DateTime.now();

  return {
    daysUntilArrival: getDays(arrival.diff(now)),
    daysSinceLastMilestone: getDays(now.diff(lastUpdate)),
  };
}

function getDays(duration) {
  return Math.floor(duration.as("days"));
}
