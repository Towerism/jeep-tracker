import { Box, Typography, Chip, Switch, FormControlLabel } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import theme from "~/src/theme";

export function VehicleOptionCodes({ rpoCodes }) {
  const [shouldDecode, setShouldDecode] = useState(true);

  let mappedOptions;
  if (shouldDecode) {
    mappedOptions = rpoCodes.filter(([, decoded]) => !!decoded);
  }
  const codes = mappedOptions ? mappedOptions : rpoCodes;
  return (
    <Grid container>
      <Grid sx={{ my: 4 }} xs={12}>
        <Typography align="center" variant="h4" gutterBottom>
          Option codes
        </Typography>
        <Box align="center">
          <FormControlLabel
            control={
              <Switch
                defaultChecked
                onChange={(event) => setShouldDecode(event.target.checked)}
              />
            }
            label="Decode RPO codes"
          />
        </Box>
        {rpoCodes.length !== codes.length && (
          <Typography
            align="center"
            variant="body2"
            gutterBottom
            color={theme.palette.warning.dark}
          >
            Some option codes were not decoded.
          </Typography>
        )}
      </Grid>
      <Grid container spacing={2} justifyContent="center" xs={12}>
        {codes.map(([code, decoded, display]) => (
          <Chip
            key={code}
            label={shouldDecode ? display : code}
            sx={{ mr: 1, my: 1 }}
            color={decoded ? "info" : "default"}
          />
        ))}
      </Grid>
    </Grid>
  );
}
