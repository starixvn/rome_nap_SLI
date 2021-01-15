export const sleep = (ms: number) => {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
};
