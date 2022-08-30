import { image } from "~/src/response-types/image";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams.toString();

  const imageUrl = `https://www.jeep.com/mediaserver/iris?${searchParams}`;
  const response = await fetch(imageUrl);
  const blob = await response.blob();

  return image(blob);
};
