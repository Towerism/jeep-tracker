import puppeteer from "puppeteer";
import { image } from "~/src/response-types/image";

export const loader = async ({ params, context, ...rest }) => {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://jeeponorder.com";

  const { von, lastName } = params;
  let browser =
    context?.browser ??
    (await puppeteer.launch({
      userDataDir: ".puppeteercache",
      headless: true,
      timeout: 10000,
    }));

  const page = await browser.newPage();
  const dimension = 1300;
  await page.setViewport({ width: dimension, height: dimension });

  await page.goto(`${baseUrl}/order-status/${von}/${lastName}?screenshot=true`);
  await page.waitForSelector("#screenshot-hook");

  const screenshotHook = await page.$("#screenshot-hook");
  const data = await screenshotHook.screenshot({ type: "jpeg" });
  const blob = new Blob([data], { type: "image/jpeg" });

  page.close();

  return image(blob, { type: "image/jpeg" });
};
