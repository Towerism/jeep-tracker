import { Button, Typography } from "@mui/material";

export function LogoButton({ big, ...props }) {
  return big ? (
    <Typography variant="h4" color="text.secondary">
      JeepOnOrder.com
    </Typography>
  ) : (
    <Button variant="text" {...props} href="/">
      JeepOnOrder.com
    </Button>
  );
}
