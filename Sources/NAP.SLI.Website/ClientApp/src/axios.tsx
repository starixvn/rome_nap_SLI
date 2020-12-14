import axios from 'axios';
import store from './store';
import storage from './features/account/authentication/storage';
import { logout } from './features/account/authentication/reducer';
import { error, hide } from './common/components/toast/reducer';
import { history } from './App';
import { RouteLinks } from './common/utils/RouteUtils';

export const installAxiosIntercepts = () => {
  axios.interceptors.request.use(
    config => {
      store.dispatch(hide());
      const token = storage.getToken();
      if (token) {
        config.headers['Authorization'] = 'bearer ' + token;
      }

      const umToken = window.configuration.umToken;
      if (umToken) {
        config.headers['UMToken'] = umToken;
      }

      return config;
    }
  );
  axios.interceptors.response.use(
    response => response,
    e => {
      if (e.response) {
        switch (e.response.status) {
          case 401:
            store.dispatch(logout());
            break;
          case 503:
            history.push(RouteLinks.ERROR_UM);
            break;
          default:
            store.dispatch(error(e.message));
        }
      } else {
        store.dispatch(error(e.message));
      }

      return Promise.reject(e);
    });
}