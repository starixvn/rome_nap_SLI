export const generateSelectOptions = (obj: any, getNameCallback: ((val: number) => string)) => {
  return Object.keys(obj).map(key => {
    const value = obj[key];
    return {
      label: getNameCallback(value),
      value
    };
  });
};

export const generateRangeSelectOptions = (from: number, to: number) => {
  const options = [];
  for (let value = from; value <= to; value++) {
    options.push({
      label: value.toString(),
      value
    });
  }

  return options;
}