import { useLoaderData, useParams } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getScreenshot } from "~/models/screenshot.server";
import { Box } from "@mui/system";
import { Button, Card, CardContent, Typography } from "@mui/material";

export const loader = async ({ params }) => {
  const { von, lastName } = params;
  const dataUrl = await getScreenshot(von, lastName);
  return json({ dataUrl });
};

export default function Screenshot() {
  const { dataUrl } = useLoaderData();
  const { von, lastName } = useParams();

  const downloadScreenshot = () => {
    var link = document.createElement("a");
    link.download = `screenshot_${von}_${lastName}}.jpg`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <Card>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Screenshot
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Below is a screenshot of your order status.
          </Typography>
          <Button onClick={downloadScreenshot} sx={{ mb: 2 }}>
            Download
          </Button>
          <Box>
            <img src={dataUrl} alt="screenshot" />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
