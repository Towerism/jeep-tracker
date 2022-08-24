import { getPdfContent } from "./pdf.server";

export async function getWindowSticker (vin) {
  const windowStickerUrl = `https://www.jeep.com/hostd/windowsticker/getWindowStickerPdf.do?vin=${vin}`;
  const content = await getPdfContent(windowStickerUrl);
  return {
    windowStickerFound: content.length > 1,
    windowStickerUrl,
  };
};