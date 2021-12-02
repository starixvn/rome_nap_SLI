import numeral from 'numeral';

export const formatInteger = (value: number) => {
  return numeral(value).format('0,0');
};

export const formatDecimal = (value: number) => {
  return numeral(value).format('0,0.00');
};

export const formatTwoDigit = (value: number) => {
  return numeral(value).format('00');
};
