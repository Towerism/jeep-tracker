import axios from "axios";
import { isCodeSubOption } from "~/src/codeSubOption";
import sortBy from "lodash/sortBy";
import { aggregateOptions } from "./optionCodes.server";

export async function getCotsOrderStatus(von, lastName) {
  let response;

  try {
    response = await axios.get(
      `https://www.jeep.com/hostz/cots/order-status/${von}/${lastName}`
    );
  } catch (err) {
    throw new Response(
      "There was no data available. Please either check VON and last name or try again later.",
      { status: 500 }
    );
  }

  const { orderstatus, vinDetails, dealerDetails } = response.data;

  if (!orderstatus.length) {
    throw new Response(
      "There was an issue fetching customer order data. Please check VON and last name.",
      { status: 400 }
    );
  }

  const currentStatuses = orderstatus.filter(
    (status) => !!status.statusUpdateDate
  );
  const { statusCode, statusDesc, statusUpdateDate, arrivalDate } =
    currentStatuses.pop();
  const { brandName, modelYear, modelName, image, vin } = vinDetails;

  const [, imageUrl] = image.split("?");
  return {
    statusCode,
    statusDesc,
    statusUpdateDate,
    brandName,
    modelYear,
    modelName,
    arrivalDate,
    timeline: getTimeline(orderstatus),
    vehicle: `${modelYear} ${modelName}`,
    image: `/image?${imageUrl}&width=826&height=600&bkgnd=transparent&resp=png`,
    vin,
    von,
    dealer: dealerDetails,
    ...(await getVehicleSpecs(modelYear, image)),
  };
}

async function getVehicleSpecs(year, imageUrl) {
  const [, querystring] = imageUrl.split("?");
  const params = new Proxy(new URLSearchParams(querystring), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const [, specModel] = params.vehicle.split("_");
  const [trimCode, lowerLevelPackage, ...rest] = params.sa.split(",");
  const { fullMap, specificMap } = await getRpoMap(year, lowerLevelPackage);
  const rpoCodes = sortBy(
    [...rest].map((code) => {
      const transformedCode = isCodeSubOption(code) ? code.slice(0, -1) : code;
      const decoded = fullMap[transformedCode]?.description ?? "";
      return {
        code: transformedCode,
        decoded,
        display: decoded ? transformedCode + " -- " + decoded : transformedCode,
        isSubOption: isCodeSubOption(code),
        extendedDescription:
          specificMap[transformedCode]?.extendedDescription ?? "",
      };
    }),
    ({ isSubOption, decoded }) => isSubOption || !decoded
  );
  function unshiftSimpleDecode(code, decoded) {
    rpoCodes.unshift({
      code,
      decoded: `${decoded} ${code}`,
      display: `${code} -- ${decoded} ${code}`,
      isSubOption: false,
    });
  }
  unshiftSimpleDecode(lowerLevelPackage, "Lower level package");
  unshiftSimpleDecode(trimCode, "Model code");
  const paintName = specificMap[params.paint]?.description;
  const fabricName = specificMap[params.fabric]?.description;
  return {
    trimCode,
    rpoCodes,
    specModel,
    paintCode: paintName ? params.paint + " - " + paintName : params.paint,
    interiorCode: fabricName
      ? params.fabric + " - " + fabricName
      : params.fabric,
  };
}

function getTimeline(orderstatus) {
  const result = orderstatus.map((os) => ({
    code: os.statusCode,
    name: os.statusDesc,
    completed: !!os.statusUpdateDate,
    completedDate: os.statusUpdateDate,
  }));

  let autoComplete = false;
  for (let i = orderstatus.length - 1; i >= 0; i--) {
    if (autoComplete) {
      result[i].completed = true;
    } else {
      autoComplete ||= result[i].completed;
    }
  }

  return result;
}

async function getRpoMap(year, lowerLevelPackage) {
  try {
    return await aggregateOptions(year, lowerLevelPackage);
  } catch (_) {
    return {};
  }
}
