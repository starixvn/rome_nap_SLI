import axios from 'axios';
import store from './store';
import storage from './features/account/authentication/services/storage';
import { logout } from './features/account/authentication/reducer';
import { error, hide } from './common/components/toast/reducer';
import { history } from './App';
import { RouteLinks } from './common/utils/RouteUtils';
import { checkSuccess } from './features/error/UM/reducer';

export const installAxiosIntercepts = () => {

  axios.interceptors.request.use(config => {
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
  });

  axios.interceptors.response.use(
    response => response,
    e => {
      if (e.response) {
        switch (e.response.status) {
          case 401:
            store.dispatch(logout());
            return Promise.reject(new Error('Handled'));
          case 403:
            store.dispatch(error('You are not authorized to use this function'));
            return Promise.reject(new Error('Handled'));
          case 503:
            const umTime = e.response.data;
            store.dispatch(checkSuccess({ umTime }));
            history.push(RouteLinks.ERROR_UM);
            return Promise.reject(new Error('Handled'));
          default:
            store.dispatch(error(e.message));
        }
      } else {
        store.dispatch(error(e.message));
      }

      return Promise.reject(e);
    });
}