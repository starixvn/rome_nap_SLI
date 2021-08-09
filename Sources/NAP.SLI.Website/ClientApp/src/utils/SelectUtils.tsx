export const generateSelectOptions = function _<T>(
  obj: GenericKeyValueObject<T>,
  getNameCallback: (val: T) => string,
): SelectOption<T>[] {
  return Object.keys(obj).map((key) => {
    const value = obj[key];
    return {
      label: getNameCallback(value),
      value,
    };
  });
};

export const generateSelectOptionsFromList = function _<T>(
  list: T[],
  getNameCallback: (val: T) => string,
): SelectOption<T>[] {
  return list.map((value) => {
    return {
      label: getNameCallback(value),
      value: value,
    };
  });
};

export const generateRangeSelectOptions = (
  from: number,
  to: number,
): SelectOption<number>[] => {
  const options = [];
  for (let value = from; value <= to; value++) {
    options.push({
      label: value.toString(),
      value,
    });
  }

  return options;
};
