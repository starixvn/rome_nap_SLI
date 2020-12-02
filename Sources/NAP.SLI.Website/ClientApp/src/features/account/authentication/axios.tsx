import axios from 'axios';
import store from '../../../store';
import storage from './storage';
import { logout } from './reducer';
import { error } from '../../../common/components/toast/reducer';

export const installAxiosIntercepts = () => {
  axios.interceptors.request.use(
    config => {
      const token = storage.getToken();
      if (token) {
        config.headers['Authorization'] = 'bearer ' + token;
      }

      return config;
    }
  );
  axios.interceptors.response.use(
    response => response,
    e => {
      if (e.response && e.response.status === 401) {
        store.dispatch(logout());
      } else {
        store.dispatch(error(e.message));
      }

      return Promise.reject(e);
    });
}