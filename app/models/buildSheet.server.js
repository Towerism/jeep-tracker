import { getPdfContent } from "./pdf.server";

export async function getBuildSheet(vin) {
  const buildSheetUrl = `https://www.jeep.com/webselfservice/BuildSheetServlet?vin=${vin}`;
  const content = await getPdfContent(buildSheetUrl);
  return {
    buildSheetFound: content.length > 5,
    buildSheetUrl,
  };
};