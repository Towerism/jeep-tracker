import { Button } from "@mui/material";

export function LogoButton(props) {
  return (
    <Button
      variant="text"
      {...props}
      style={{ position: "fixed", bottom: 0, left: 0 }}
      href="/"
    >
      JeepOnOrder.com
    </Button>
  );
}
