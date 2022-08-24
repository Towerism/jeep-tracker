import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const von = formData.get("von");
  const lastName = formData.get("lastName");

  return redirect(`/order-status/${von}/${lastName}`);
};

export default function Index() {
  return (
    <Form method="post">
      <p>
        <label>
          VON:
          <input type="text" name="von" />
        </label>
      </p>
      <p>
        <label>
          Last name:
          <input type="text" name="lastName" />
        </label>
      </p>
      <p>
        <button type="submit">Retrieve order</button>
      </p>
    </Form>
  );
}
