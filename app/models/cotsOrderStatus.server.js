import axios from "axios";
import rpoMap from "~/src/rpoMap";

export async function getCotsOrderStatus(von, lastName) {
  const { data } = await axios.get(
    `https://www.jeep.com/hostz/cots/order-status/${von}/${lastName}`
  );

  const { orderstatus, vinDetails, dealerDetails } = data;

  const currentStatuses = orderstatus.filter(
    (status) => !!status.statusUpdateDate
  );
  const { statusCode, statusDesc, statusUpdateDate, arrivalDate } =
    currentStatuses.pop();
  const { brandName, modelYear, modelName, image, vin } = vinDetails;

  return {
    statusCode,
    statusDesc,
    statusUpdateDate,
    brandName,
    modelYear,
    modelName,
    arrivalDate,
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
    dealer: dealerDetails,
    ...getVehicleSpecs(image),
  };
}

function getVehicleSpecs(imageUrl) {
  const [, querystring] = imageUrl.split("?");
  const params = new Proxy(new URLSearchParams(querystring), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const [, specModel] = params.vehicle.split("_");
  const [trimCode, ...rest] = params.sa.split(",");
  const rpoCodes = [trimCode, ...rest].map((code) => [
    code,
    rpoMap[code],
    rpoMap[code] ? code + " - " + rpoMap[code] : code,
  ]);
  return {
    trimCode,
    rpoCodes,
    specModel,
    paintCode: params.paint,
    interiorCode: params.fabric,
  };
}
