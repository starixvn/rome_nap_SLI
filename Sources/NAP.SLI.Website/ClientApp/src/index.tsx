// @ts-nocheck
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { init, ErrorBoundary } from '@sentry/react';
import { installAxiosIntercepts } from './axios';
import store from './store';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import SentryFallback from './common/components/error/SentryFallback';

const urlParams = new URLSearchParams(window.location.search);
window.configuration.umToken = urlParams.get('umToken');
init({
  dsn: window.configuration.sentryDsn
});
installAxiosIntercepts();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary fallback={SentryFallback} showDialog>
      <App />
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();