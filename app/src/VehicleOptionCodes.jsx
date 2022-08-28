import * as React from "react";
import { Box, Typography, Chip, Switch, FormControlLabel } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import rpoMap from "~/src/rpoMap";
import theme from "~/src/theme";

export class VehicleOptionCodes extends React.Component {
  constructor(props) {
    super(props);

    this.state = { shouldDecode: false };
  }

  onShouldDecodeChange(event) {
    this.setState({ shouldDecode: event.target.checked });
  }

  render() {
    let mappedOptions;
    if (this.state.shouldDecode) {
      mappedOptions = this.props.rpoCodes
        .map((code) => [code, rpoMap[code]])
        .filter(([, decoded]) => !!decoded);
    }
    const codes = mappedOptions
      ? mappedOptions.map(([code, decoded]) => `${code} - ${decoded}`)
      : this.props.rpoCodes;
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
                  value={this.state.shouldDecode}
                  onChange={this.onShouldDecodeChange.bind(this)}
                />
              }
              label="Decode RPO codes"
            />
          </Box>
          {this.props.rpoCodes.length !== codes.length && (
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
          {codes.map((rpo) => (
            <Chip key={rpo} label={rpo} sx={{ mr: 1, my: 1 }} />
          ))}
        </Grid>
      </Grid>
    );
  }
}
