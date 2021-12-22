import storage from './storage';
import { logout } from 'features/account/authentication/reducer';
import store from 'app/store';
import { post } from './http';

let timeout: number | undefined;
const timeoutInterval =
  (parseInt(window.configuration.accessExpiration) - 1) * 60 * 1000;

type CheckInData = {
  isSuccess: boolean;
  token: string;
  isAdmin: boolean;
  userId: number;
};

export const stopCheckin = () => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = undefined;
  }
};

export const startCheckin = () => {
  stopCheckin();
  timeout = window.setTimeout(async () => await checkin(), timeoutInterval);
};

export const checkin = async () => {
  stopCheckin();
  try {
    const account = storage.get();
    if (!account || !account.token) {
      return;
    }

    const payload = {
      token: account.token,
    };
    const response = await post<CheckInData>('/api/account/refresh', payload);
    const { isSuccess, token, userId, isAdmin } = response.data;
    if (isSuccess) {
      storage.save({
        username: account.username,
        userId,
        isAdmin,
        token,
      });
      timeout = window.setTimeout(async () => await checkin(), timeoutInterval);
    } else {
      alert(
        "You have been logged out because your account has logged into another session. Don't recognize this activity? Please contact your upline for assistance.",
      );
      store.dispatch(logout());
    }
  } catch (e) {
    // not do anything
  }
};
