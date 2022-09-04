import axios from "axios";
import uniqBy from "lodash/uniqBy";
import mapKeys from "lodash/mapKeys";
import mapValues from "lodash/mapValues";

export async function aggregateOptions(year) {
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
    return configurationOptions;
  });
  const optionsObjects = await Promise.all(optionsPromises);
  const noErrors = optionsObjects.filter((options) => options !== "error");
  return noErrors.reduce((acc, curr) => {
    let normalizedOptions = mapKeys(
      curr,
      (_, optionName) => optionName.split("-")[0] || optionName
    );
    normalizedOptions = mapValues(
      normalizedOptions,
      ({ description }) => description
    );
    return Object.assign(acc, normalizedOptions);
  }, {});
}
