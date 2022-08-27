import { BasicStatusCard } from "./BasicStatusCard";

export function DocumentCard({ title, url, found }) {
  return (
    <BasicStatusCard title={title}>
      {found ? <a href={url}>Found</a> : "Not yet"}
    </BasicStatusCard>
  );
}
