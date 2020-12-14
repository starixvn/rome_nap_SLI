import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/react';
import { installAxiosIntercepts } from './axios';
import store from './store';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const urlParams = new URLSearchParams(window.location.search);
window.configuration.umToken = urlParams.get('umToken');
Sentry.init({ dsn: window.configuration.sentryDsn });
installAxiosIntercepts();
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();