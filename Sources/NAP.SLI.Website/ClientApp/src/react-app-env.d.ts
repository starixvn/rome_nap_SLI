/// <reference types="react-scripts" />

export { };

declare global {
  interface Window {
    configuration: {
      env: string;
      sentryDsn: string;
      umToken: string | null;
    };
  }
}