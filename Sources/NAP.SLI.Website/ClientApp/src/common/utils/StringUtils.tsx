export const isNullOrWhiteSpaces = (str: string) => {
  return str === null || (/^\s*$/).test(str);
};