export const image = (data, { type = "image/png" } = {}) => {
  let headers = new Headers();
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", type);
  }

  return new Response(data, {
    headers,
  });
};
