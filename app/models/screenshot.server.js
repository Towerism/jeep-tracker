import axios from "axios";

export async function getScreenshot(von, lastName) {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : "https://jeep-tracker-screenshot.fly.dev";

  const { data } = await axios.get(`${baseUrl}/screenshot/${von}/${lastName}`);
  return data.dataUrl;
}
