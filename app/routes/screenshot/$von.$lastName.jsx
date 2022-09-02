import { useLoaderData, useParams } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getScreenshot } from "~/models/screenshot.server";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import {
  copyImageToClipboard,
  canCopyImagesToClipboard,
} from "copy-image-clipboard";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

export const loader = async ({ params }) => {
  const { von, lastName } = params;
  const dataUrl = await getScreenshot(von, lastName);
  return json({ dataUrl });
};

export default function Screenshot() {
  const { dataUrl } = useLoaderData();
  const { von, lastName } = useParams();
  const [copyLabel, setCopyLabel] = useState("Copy to clipboard");
  const [canCopyImage, setCanCopyImage] = useState(false);

  useEffect(() => {
    setCanCopyImage(canCopyImagesToClipboard());
  }, []);

  const downloadScreenshot = () => {
    var link = document.createElement("a");
    link.download = `screenshot_${von}_${lastName}}.jpg`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyScreenshot = async () => {
    try {
      await copyImageToClipboard(dataUrl);
      setCopyLabel("Copied!");
      setTimeout(() => setCopyLabel("Copy to clipboard"), 5000);
    } catch (err) {
      setCopyLabel("Failed :(");
    }
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
            {von} - {lastName}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Below is a screenshot of your order status.
          </Typography>
          <Stack
            direction="row"
            justifyContent="center"
            spacing={1}
            divider={<Divider orientation="vertical" flexItem />}
            sx={{ mb: 4 }}
          >
            <Button onClick={downloadScreenshot}>Download</Button>
            {canCopyImage && (
              <Button onClick={copyScreenshot}>{copyLabel}</Button>
            )}
          </Stack>
          <Box>
            <img src={dataUrl} alt="screenshot" style={{ maxWidth: "100%" }} />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
