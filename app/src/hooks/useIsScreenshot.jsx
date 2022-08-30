import { useSearchParams } from "@remix-run/react";

export function useIsScreenshot() {
  const [searchParams] = useSearchParams();
  const isScreenshot = Boolean(searchParams.get("screenshot"));

  return isScreenshot;
}
