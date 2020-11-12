export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const generateSelectOptions = (obj, getNameCallback) => {
  return Object.keys(obj).map(key => {
    const value = obj[key];
    return {
      label: getNameCallback(value),
      value
    };
  });
};