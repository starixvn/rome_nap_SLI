import { captureException, showReportDialog } from '@sentry/react';

export const handleException = (e: Error) => {
  if (e.message === 'Handled') {
    return;
  }

  if (window.configuration.env === 'PROD') {
    captureException(e);
    showReportDialog();
  }
  else {
    throw e;
  }
};