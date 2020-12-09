import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/react';
import store from './store';
import App from './App';
import Config from './configurations/config';
import registerServiceWorker from './registerServiceWorker';

const rootElement = document.getElementById('root');
Sentry.init({ dsn: Config.Dsn });
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

registerServiceWorker();
