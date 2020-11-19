export const FormatStrings = {
  Date: 'MM/DD/YYYY'
}

export const formatDate = (moment) => {
  return moment.format(FormatStrings.Date);
}

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