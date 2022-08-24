import { redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const von = formData.get("von");
  const lastName = formData.get("lastName");

  return redirect(`/${von}/${lastName}`);
};

export default function Index() {
  return <Link to="/order-status">Order status</Link>;
}
