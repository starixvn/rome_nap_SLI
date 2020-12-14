/// <reference types="react-scripts" />

export { };

declare global {
  interface Window {
    configuration: {
      sentryDsn: string;
      umToken: string | null;
    };
  }
}