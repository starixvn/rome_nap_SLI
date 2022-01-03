import storage from './storage';
import { logout } from 'features/account/authentication/reducer';
import store from 'app/store';
import { post } from './http';

let refreshTimeout: number | undefined;
let checkInTimeout: number | undefined;
const refreshInterval = Math.min(
  1000000,
  (parseInt(window.configuration.accessExpiration) - 1) * 60 * 1000,
);
const checkInInterval = 30 * 1000;

type CheckInData = ResultData & {
  token: string;
  isAdmin: boolean;
  userId: number;
};

export const startRefresh = () => {
  stopRefresh();
  refreshTimeout = window.setTimeout(
    async () => await refresh(),
    refreshInterval,
  );
};

export const stopRefresh = () => {
  if (refreshTimeout) {
    clearTimeout(refreshTimeout);
    refreshTimeout = undefined;
  }
};

export const startCheckIn = () => {
  stopCheckIn();
  checkInTimeout = window.setTimeout(
    async () => await checkin(),
    checkInInterval,
  );
};

export const stopCheckIn = () => {
  if (checkInTimeout) {
    clearTimeout(checkInTimeout);
    checkInTimeout = undefined;
  }
};

export const start = () => {
  startRefresh();
  startCheckIn();
};

export const stop = () => {
  stopRefresh();
  stopCheckIn();
};

export const checkin = async () => {
  stopCheckIn();
  try {
    const account = storage.get();
    if (!account || !account.token) {
      return;
    }

    const response = await post<ResultData>('/api/account/checkin', {});
    const { isSuccess } = response.data;
    if (isSuccess) {
      startCheckIn();
    } else {
      stop();
      alert(
        "You have been logged out because your account has logged into another session. Don't recognize this activity? Please contact your upline for assistance.",
      );
      store.dispatch(logout());
    }
  } catch (e) {
    // not do anything
  }
};

export const refresh = async () => {
  stopRefresh();
  try {
    const account = storage.get();
    if (!account || !account.token) {
      return;
    }

    const response = await post<CheckInData>('/api/account/refresh', {});
    const { isSuccess, token, userId, isAdmin } = response.data;
    if (isSuccess) {
      storage.save({
        username: account.username,
        userId,
        isAdmin,
        token,
      });
      startRefresh();
    }
  } catch (e) {
    // not do anything
  }
};
