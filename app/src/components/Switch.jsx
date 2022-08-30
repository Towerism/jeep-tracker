import { Switch as MuiSwitch, FormControlLabel } from "@mui/material";

export function Switch({ label, ...props }) {
  return <FormControlLabel control={<MuiSwitch {...props} />} label={label} />;
}
