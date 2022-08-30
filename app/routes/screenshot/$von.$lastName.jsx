import puppeteer from "puppeteer";
import { image } from "~/src/response-types/image";

export const loader = async ({ params }) => {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://jeeponorder.com";

  const { von, lastName } = params;
  const browser = await puppeteer.launch({
    userDataDir: ".puppeteercache",
    headless: true,
    args: [
      "--no-sandbox",
      "--autoplay-policy=user-gesture-required",
      "--disable-background-networking",
      "--disable-background-timer-throttling",
      "--disable-backgrounding-occluded-windows",
      "--disable-breakpad",
      "--disable-client-side-phishing-detection",
      "--disable-component-update",
      "--disable-default-apps",
      "--disable-dev-shm-usage",
      "--disable-domain-reliability",
      "--disable-extensions",
      "--disable-features=AudioServiceOutOfProcess",
      "--disable-hang-monitor",
      "--disable-ipc-flooding-protection",
      "--disable-notifications",
      "--disable-offer-store-unmasked-wallet-cards",
      "--disable-popup-blocking",
      "--disable-print-preview",
      "--disable-prompt-on-repost",
      "--disable-renderer-backgrounding",
      "--disable-setuid-sandbox",
      "--disable-speech-api",
      "--disable-sync",
      "--hide-scrollbars",
      "--ignore-gpu-blacklist",
      "--metrics-recording-only",
      "--mute-audio",
      "--no-default-browser-check",
      "--no-first-run",
      "--no-pings",
      "--no-sandbox",
      "--no-zygote",
      "--password-store=basic",
      "--use-gl=swiftshader",
      "--use-mock-keychain",
    ],
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
