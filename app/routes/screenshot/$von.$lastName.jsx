import { useLoaderData, useParams } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getScreenshot } from "~/models/screenshot.server";
import { Box } from "@mui/system";
import { useRef, useState } from "react";
import {
  getBlobFromImageElement,
  copyBlobToClipboard,
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
  const imageRef = useRef();
  const [copyLabel, setCopyLabel] = useState("Copy to clipboard");

  const downloadScreenshot = () => {
    var link = document.createElement("a");
    link.download = `screenshot_${von}_${lastName}}.jpg`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyScreenshot = async () => {
    const blob = await getBlobFromImageElement(imageRef.current);
    await copyBlobToClipboard(blob);
    setCopyLabel("Copied!");
    setTimeout(() => setCopyLabel("Copy to clipboard"), 5000);
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <Card>
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
            <Button onClick={copyScreenshot}>{copyLabel}</Button>
          </Stack>
          <Box>
            <img ref={imageRef} src={dataUrl} alt="screenshot" />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
