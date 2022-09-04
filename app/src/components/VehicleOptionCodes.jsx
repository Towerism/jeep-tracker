import {
  Box,
  Typography,
  Tooltip,
  Skeleton,
  ButtonGroup,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import { useIsScreenshot } from "~/src/hooks/useIsScreenshot";
import { Switch } from "./Switch";

function OptionChip({ decoded, showDecoded, code, isSubOption }) {
  const color =
    isSubOption && decoded ? "neutral" : decoded ? "neutral2" : "inherit";
  return (
    <ButtonGroup color={color} size="small" variant="contained">
      <Button>{code}</Button>
      {showDecoded && (
        <Button
          color={isSubOption ? "neutral3" : "neutral4"}
          sx={{ textTransform: "none" }}
        >
          {decoded}
        </Button>
      )}
    </ButtonGroup>
  );
}

export function VehicleOptionCodes({ rpoCodes = [] }) {
  const [showDecoded, setShowDecoded] = useState(true);

  const isScreenshot = useIsScreenshot();

  let codes = rpoCodes;
  if (showDecoded) {
    codes = rpoCodes.filter(({ decoded }) => !!decoded);
  }
  return (
    <Grid container sx={isScreenshot ? { mt: -10 } : {}}>
      <Grid sx={{ my: 2 }} xs={12}>
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
      <Grid container spacing={1.5} justifyContent="center" xs={12}>
        {!codes.length &&
          [...Array(20).keys()].map((i) => (
            <Skeleton
              key={i}
              sx={{ mr: 1.5, mb: 1.5 }}
              variant="rounded"
              animation="wave"
              width={170}
              height={26}
            />
          ))}
        {codes.map(({ code, decoded, display, isSubOption }) => (
          <Grid key={code}>
            {decoded && !showDecoded ? (
              <Tooltip title={display} placement="top">
                <Box>
                  <OptionChip
                    decoded
                    code={code}
                    showDeocded={showDecoded}
                    isSubOption={isSubOption}
                  />
                </Box>
              </Tooltip>
            ) : (
              <OptionChip
                decoded={decoded}
                code={code}
                showDecoded={showDecoded}
                isSubOption={isSubOption}
              />
            )}
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
