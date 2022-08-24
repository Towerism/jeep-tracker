import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }) => {
  return json(params);
};

export default function OrderStatus() {
  const params = useLoaderData();
  return (
    <main>
      <p>
        <strong>params:</strong>
        <p>{params}</p>
      </p>
    </main>
  );
}
