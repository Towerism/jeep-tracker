const image = (data, init = {}) => {
  let responseInit = typeof init === "number" ? { status: init } : init;

  let headers = new Headers(responseInit.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "image/png");
  }

  return new Response(data, {
    ...responseInit,
    headers,
  });
};

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams.toString();

  const imageUrl = `https://www.jeep.com/mediaserver/iris?${searchParams}`;
  const response = await fetch(imageUrl);
  const blob = await response.blob();

  return image(blob);
};
