import { BasicStatusCard } from "./BasicStatusCard";

export function DocumentCard({ url, found, ...props }) {
  return (
    <BasicStatusCard {...props}>
      {found ? <a href={url}>Found</a> : "Not yet"}
    </BasicStatusCard>
  );
}
