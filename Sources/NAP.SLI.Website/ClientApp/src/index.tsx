import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/react';
import store from './app/store';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';

const urlParams = new URLSearchParams(window.location.search);
window.configuration.umToken = urlParams.get('umToken');
Sentry.init({
  dsn: window.configuration.sentryDsn,
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
