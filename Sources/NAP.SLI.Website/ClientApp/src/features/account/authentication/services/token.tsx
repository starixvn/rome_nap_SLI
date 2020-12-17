// @ts-nocheck
import axios from 'axios';
import { handleException } from '../../../../common/utils/ExceptionUtils';
import store from '../../../../store';
import { logout } from '../reducer';
import storage from './storage';

let timer = undefined;
const timeout = 10 * 60 * 1000;

export const clearRefreshToken = () => {
  if (timer) {
    clearTimeout(timer);
    timer = undefined;
  }
}

export const startRefreshToken = () => {
  clearRefreshToken();
  timer = setTimeout(async () => await refreshToken(), timeout);
}

export const refreshToken = async () => {
  try {
    const account = storage.get();
    if (account) {
      const payload = {
        token: account.token
      };
      const response = await axios.post('/api/authentication/refresh', payload);
      const { isSuccess } = response.data;
      if (isSuccess) {
        Object.assign(account, { token: response.data.token });
        storage.save(account);
        startRefreshToken();
      } else {
        store.dispatch(logout());
      }
    }
  }
  catch (e) {
    handleException(e);
  }
}