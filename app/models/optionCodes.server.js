import axios from "axios";
import uniqBy from "lodash/uniqBy";
import mapKeys from "lodash/mapKeys";
import mapValues from "lodash/mapValues";

export async function aggregateOptions(year, lowerLevelPackage) {
  const { data } = await axios.get(
    "https://www.jeep.com/hostd/api/launch-mode/modes.json"
  );
  const models = data.models.filter(({ ccode }) =>
    new RegExp(`.{3}${year}.*`).test(ccode)
  );
  const configurations = uniqBy(models, ({ ccode, llp }) => `${ccode}${llp}`);
  const optionsPromises = configurations.map(async ({ ccode, llp }) => {
    let configurationOptions;
    try {
      const { data: options } = await axios.get(
        `https://www.jeep.com/hostd/api/catalog-option/EN/details/models/${ccode}/lowerLevelPackages/${llp}.json`
      );
      configurationOptions = options;
    } catch (err) {
      configurationOptions = "error";
    }
    return [`${ccode}-${llp}`, configurationOptions];
  });
  const optionsObjects = await Promise.all(optionsPromises);
  const noErrors = optionsObjects.filter((options) => options !== "error");
  const fullMap = noErrors.reduce((acc, [, options]) => {
    let normalizedOptions = mapKeys(
      options,
      (_, optionName) => optionName.split("-")[0] || optionName
    );
    normalizedOptions = mapValues(
      normalizedOptions,
      ({ description }) => description
    );
    return Object.assign(acc, normalizedOptions);
  }, {});
  const specificMap = noErrors.reduce((acc, [key, options]) => {
    const [, llp] = key.split("-");
    if (llp !== lowerLevelPackage) {
      return acc;
    }
    let normalizedOptions = mapKeys(
      options,
      (_, optionName) => optionName.split("-")[0] || optionName
    );
    normalizedOptions = mapKeys(
      normalizedOptions,
      (_, optionName) => optionName.split("_")[0] || optionName
    );
    normalizedOptions = mapValues(
      normalizedOptions,
      ({ description }) => description
    );
    return Object.assign(acc, normalizedOptions);
  }, {});
  console.log(lowerLevelPackage, specificMap);
  return {
    fullMap,
    specificMap,
  };
}
