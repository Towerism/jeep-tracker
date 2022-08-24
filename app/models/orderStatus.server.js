import { getCotsOrderStatus } from "./cotsOrderStatus.server";
import { getBuildSheet } from "./buildSheet.server";
import { getWindowSticker } from "./windowSticker.server";

export async function getOrderStatus(von, lastName) {
  const trackingInfo = await getCotsOrderStatus(von, lastName);
  const { vin } = trackingInfo;

  const [buildResponse, stickerResponse] = await Promise.all([
    getBuildSheet(vin),
    getWindowSticker(vin),
  ]);

  return {
    ...trackingInfo,
    ...buildResponse,
    ...stickerResponse
  };
};