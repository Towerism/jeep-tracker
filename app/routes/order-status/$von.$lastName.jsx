import { json } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";

import { getOrderStatus } from "~/models/orderStatus.server";
import { OrderStatus } from "~/src/components/OrderStatus";

export const loader = async ({ params }) => {
  const { von, lastName } = params;
  const result = await getOrderStatus(von, lastName);
  return json(result);
};

export const meta = ({ params }) => {
  const { von, lastName } = params;
  return { title: `Order Status - ${von} - ${lastName}` };
};

export default function OrderStatusPage() {
  const orderStatus = useLoaderData();

  const { lastName } = useParams();

  return (
    <OrderStatus orderStatus={orderStatus} lastName={lastName}></OrderStatus>
  );
}
