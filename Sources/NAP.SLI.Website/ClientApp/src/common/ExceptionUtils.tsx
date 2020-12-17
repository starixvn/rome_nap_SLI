import { captureException, showReportDialog } from '@sentry/react';

export const handleException = (e: Error) => {
  if (e.message === 'Handled') {
    return;
  }

  captureException(e);
  showReportDialog();
};