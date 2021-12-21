import React, { PropsWithChildren } from 'react';
import { Container } from 'reactstrap';
import SentryFallback from './SentryFallback';
import { ErrorBoundary } from '@sentry/react';

export const MainLayout = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <Container fluid>
      <ErrorBoundary
        beforeCapture={(scope) => {
          scope.setTag('location', 'main');
        }}
        fallback={SentryFallback}
      >
        {children}
      </ErrorBoundary>
    </Container>
  );
};
