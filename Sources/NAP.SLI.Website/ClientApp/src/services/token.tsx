import { handleException } from 'utils/ExceptionUtils';
import store from 'app/store';
import { logout } from 'features/account/authentication/reducer';
import storage from './storage';
import { post } from './http';

let timeout: number | undefined;
const timeoutInterval = 10 * 60 * 1000;

export const stopRefreshToken = () => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = undefined;
  }
};

export const startRefreshToken = () => {
  if (!timeout) {
    timeout = window.setTimeout(
      async () => await refreshToken(),
      timeoutInterval,
    );
  }
};

type RefreshTokenData = ResultData & {
  token: string;
};
export const refreshToken = async () => {
  try {
    const account = storage.get();
    if (account) {
      const payload = {
        token: account.token,
      };
      const response = await post<RefreshTokenData>(
        '/api/authentication/refresh',
        payload,
      );
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
  } catch (e) {
    handleException(e);
  }
};
