import { Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

export function BasicStatusCard({ title, children, ...props }) {
  return (
    <Grid {...props}>
      <Card sx={{ minWidth: 150 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h5" component="div">
            {children}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
