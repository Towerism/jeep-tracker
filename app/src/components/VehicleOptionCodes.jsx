import { Box, Typography, Chip, Tooltip } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import { useIsScreenshot } from "../hooks/useIsScreenshot";
import { Switch } from "./Switch";

function OptionChip({ decoded, label }) {
  return <Chip label={label} color={decoded ? "info" : "default"} />;
}

export function VehicleOptionCodes({ rpoCodes }) {
  const [showDecoded, setShowDecoded] = useState(true);

  const isScreenshot = useIsScreenshot();

  let mappedOptions;
  if (showDecoded) {
    mappedOptions = rpoCodes.filter(([, decoded]) => !!decoded);
  }
  const codes = mappedOptions ? mappedOptions : rpoCodes;
  return (
    <Grid container>
      <Grid sx={{ my: 4 }} xs={12}>
        <Typography align="center" variant="h4">
          Option codes
        </Typography>
        {!isScreenshot && (
          <Box align="center">
            <Switch
              label="Show order guide options only"
              defaultChecked
              onChange={(event) => setShowDecoded(event.target.checked)}
            />
          </Box>
        )}
      </Grid>
      <Grid container spacing={1} justifyContent="center" xs={12}>
        {codes.map(([code, decoded, display]) => (
          <Grid key={code}>
            {decoded && !showDecoded ? (
              <Tooltip title={display} placement="top">
                <Box>
                  <OptionChip decoded label={showDecoded ? display : code} />
                </Box>
              </Tooltip>
            ) : (
              <OptionChip
                decoded={decoded}
                label={showDecoded ? display : code}
              />
            )}
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
