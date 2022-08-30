import { BasicStatusCard } from "./BasicStatusCard";
import Link from "@mui/material/Link";

export function DocumentCard({ url, found, ...props }) {
  return (
    <BasicStatusCard {...props}>
      {found ? (
        <Link href={url} target="_blank" color="inherit">
          Found
        </Link>
      ) : (
        "Not yet"
      )}
    </BasicStatusCard>
  );
}
