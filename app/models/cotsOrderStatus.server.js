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
    timeline: orderstatus.map((os) => ({
      code: os.statusCode,
      name: os.statusDesc,
      completed: !!os.statusUpdateDate,
      completedDate: os.statusUpdateDate,
    })),
    vehicle: `${modelYear} ${modelName}`,
    image: `${image}&width=826&height=600&bkgnd=transparent&resp=png`,
    vin,
    von,
    ...getVehicleSpecs(image)
  };
}

function getVehicleSpecs(imageUrl) {
  const [,querystring] = imageUrl.split("?");
  const params = new Proxy(new URLSearchParams(querystring), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const [,specModel] = params.vehicle.split("_");
  const [trimCode, ...rpoCodes] = params.sa.split(",");
  return {
    trimCode,
    rpoCodes,
    specModel
  };
}