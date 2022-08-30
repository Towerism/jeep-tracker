import puppeteer from "puppeteer";
import { image } from "~/src/response-types/image";

export const loader = async ({ params }) => {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://jeeponorder.com";

  const { von, lastName } = params;
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    timeout: 10000,
  });
  const page = await browser.newPage();
  const dimension = 1200;
  await page.setViewport({ width: dimension, height: dimension });
  await page.goto(`${baseUrl}/order-status/${von}/${lastName}?screenshot=true`);
  await page.waitForSelector("#screenshot-hook");
  const screenshotHook = await page.$("#screenshot-hook");
  const data = await screenshotHook.screenshot({ type: "jpeg" });
  const blob = new Blob([data], { type: "image/jpeg" });
  await browser.close();
  return image(blob, { type: "image/jpeg" });
};
