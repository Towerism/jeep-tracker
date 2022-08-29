import puppeteer from "puppeteer";
import { image } from "../../src/image";

export const loader = async ({ params }) => {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://jeeponorder.com";

  const { von, lastName } = params;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const dimension = 1200;
  await page.setViewport({ width: dimension, height: dimension });
  await page.goto(`${baseUrl}/order-status/${von}/${lastName}`);
  await page.waitForSelector("#screenshot-hook");
  const screenshotHook = await page.$("#screenshot-hook");
  const data = await screenshotHook.screenshot({ type: "jpeg" });
  const blob = new Blob([data], "image/jpeg");
  await browser.close();
  return image(blob, { type: "image/jpeg" });
};
