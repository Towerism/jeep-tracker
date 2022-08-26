import axios from "axios";

export async function getCotsOrderStatus(von, lastName) {
  const { data } = await axios.get(
    `https://www.jeep.com/hostz/cots/order-status/${von}/${lastName}`
  );

  const { orderstatus, vinDetails } = data;

  const currentStatuses = orderstatus.filter(
    (status) => !!status.statusUpdateDate
  );
  const { statusCode, statusDesc, statusUpdateDate } = currentStatuses.pop();
  const { brandName, modelYear, modelName, image, vin } = vinDetails;

  return {
    statusCode,
    statusDesc,
    statusUpdateDate,
    brandName,
    modelYear,
    modelName,
    rpoCodes: getRpoCodes(image),
    timeline: orderstatus.map((os) => ({
      milestoneName: os.statusDesc,
      completed: !!os.statusUpdateDate,
      completedDate: os.statusUpdateDate,
    })),
    vehicle: `${modelYear} ${modelName}`,
    image: `${image}&width=826&height=600&bkgnd=transparent&resp=png`,
    vin,
    von,
  };
}

function getRpoCodes(imageUrl) {
  const [,querystring] = imageUrl.split("?");
  const params = new Proxy(new URLSearchParams(querystring), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  return params.sa.split(",");
}