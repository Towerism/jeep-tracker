import { BasicStatusCard } from "./BasicStatusCard";
import { DocumentCard } from "./DocumentCard";
import Grid from "@mui/material/Unstable_Grid2";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Switch } from "./Switch";
import { useIsScreenshot } from "../hooks/useIsScreenshot";

export function BasicTrackingData({ data, hideSensitiveData }) {
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
  const [hideVon, setHideVon] = useState(hideSensitiveData);
  const [hideVin, setHideVin] = useState(hideSensitiveData);

  const isScreenshot = useIsScreenshot();

  useEffect(() => {
    if (!vin) {
      setDisplayVin("Not yet");
    } else if (hideVin) {
      setDisplayVin();
    } else {
      setDisplayVin(vin);
    }
  }, [vin, hideVin]);

  return (
    <Box>
      {!isScreenshot && (
        <Box align="center">
          <Switch
            label="Hide VON"
            defaultChecked={hideSensitiveData}
            onChange={(event) => setHideVon(event.target.checked)}
          />
          <Switch
            label="Hide VIN"
            defaultChecked={hideSensitiveData}
            onChange={(event) => setHideVin(event.target.checked)}
          />
        </Box>
      )}
      <Grid container spacing={2} justifyContent="center">
        <BasicStatusCard title="Order number" xs={12} md={5}>
          {hideVon ? "Hidden" : von}
        </BasicStatusCard>
        <BasicStatusCard title="Last milestone" xs={12} md={5}>
          {statusCode} - {statusDesc}
        </BasicStatusCard>
        <BasicStatusCard title="Days since last milestone" xs={12} md={10}>
          {daysSinceLastMilestone} day{daysSinceLastMilestone > 1 ? "s" : ""}{" "}
          ago
        </BasicStatusCard>
        <BasicStatusCard title="VIN" xs={12} md={10}>
          {!vin ? "Not yet" : hideVin ? "Hidden" : vin}
        </BasicStatusCard>
        <DocumentCard
          title="Window sticker"
          found={windowStickerFound}
          url={windowStickerUrl}
          xs={12}
          md={5}
        />
        <DocumentCard
          title="Build sheet"
          found={buildSheetFound}
          url={buildSheetUrl}
          xs={12}
          md={5}
        />
        {arrivalDate && (
          <BasicStatusCard title="Est. arrival" xs={12} md={5}>
            {arrivalDate}
          </BasicStatusCard>
        )}
        {arrivalDate && (
          <BasicStatusCard title="Est. days to arrival" xs={12} md={5}>
            In {daysUntilArrival} day{daysUntilArrival > 1 ? "s" : ""}
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
