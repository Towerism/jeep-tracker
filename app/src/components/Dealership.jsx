import { BasicStatusCard } from "./BasicStatusCard";

export function Dealership({ dealer }) {
  return (
    <>
      <BasicStatusCard title="Address">{dealer.address}</BasicStatusCard>
      <BasicStatusCard title="City">{dealer.city}</BasicStatusCard>
      <BasicStatusCard title="State">{dealer.state}</BasicStatusCard>
      <BasicStatusCard title="Zip">{dealer.zip}</BasicStatusCard>
      <BasicStatusCard title="Phone number">
        {dealer.phoneNumber}
      </BasicStatusCard>
    </>
  );
}
