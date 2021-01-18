// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

type CryptoJS = {
  CfsEnCode: (v: string) => string;
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const CryptoJS: CryptoJS = require('../libs/CryptoJS');
