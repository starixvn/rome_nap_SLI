import * as numeral from 'numeral';

export const formatInteger = (number) => {
  return numeral(number).format('0,0');
}

export const formatDecimal = (number) => {
  return numeral(number).format('0,0.00');
}