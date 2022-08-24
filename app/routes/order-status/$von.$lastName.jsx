import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getOrderStatus } from "~/models/orderStatus.server";

export const loader = async ({ params }) => {
  const { von, lastName } = params;
  const result = await getOrderStatus(von, lastName);
  return json(result);
};

export default function OrderStatus() {
  const result = useLoaderData();
  const str = JSON.stringify(result);
  return (
    <main>
      <p>{str}</p>
    </main>
  );
}
