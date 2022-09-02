import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getScreenshot } from "~/models/screenshot.server";
import { Box } from "@mui/system";

export const loader = async ({ params }) => {
  const { von, lastName } = params;
  const dataUrl = await getScreenshot(von, lastName);
  return json({ dataUrl });
};

export default function Screenshot() {
  const { dataUrl } = useLoaderData();
  return (
    <Box sx={{ textAlign: "center" }}>
      <img src={dataUrl} alt="screenshot" />
    </Box>
  );
}
