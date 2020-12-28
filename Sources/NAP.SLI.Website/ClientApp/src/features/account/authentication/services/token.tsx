import axios from 'axios';
import { handleException } from '../../../../common/utils/ExceptionUtils';
import store from '../../../../store';
import { logout } from '../reducer';
import storage from './storage';

var timeout : NodeJS.Timeout;
const timeoutInterval = 10 * 60 * 1000;

export const stopRefreshToken = () => {
  if (timeout) {
    clearTimeout(timeout);
  }
}

export const startRefreshToken = () => {
  if (!timeout) {
    timeout = setTimeout(async () => await refreshToken(), timeoutInterval);
  }
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
        stopRefreshToken();
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