/* eslint-disable react/prop-types */
import React from 'react';
import { FallbackRender } from '@sentry/react/dist/errorboundary';
import { Alert } from 'reactstrap';

const SentryFallback: FallbackRender = ({ error }) => {
  return (
    <Alert color="danger">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </Alert>
  );
};

export default SentryFallback;
