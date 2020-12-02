// @ts-nocheck

export const generateSelectOptions = (obj, getNameCallback) => {
  return Object.keys(obj).map(key => {
    const value = obj[key];
    return {
      label: getNameCallback(value),
      value
    };
  });
};

export const generateRangeSelectOptions = (from, to) => {
  const options = [];
  for (let value = from; value <= to; value++) {
    options.push({
      label: value.toString(),
      value
    });
  }

  return options;
}