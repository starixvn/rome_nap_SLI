// @ts-nocheck
import axios from 'axios';
import { handleException } from "../../../../common/utils/ExceptionUtils";
import storage from './storage';
import { logout } from '../reducer';
import store from '../../../../store';

let timer = undefined;
const timeout = 30 * 1000;

export const clearCheckin = () => {
  if (timer) {
    clearTimeout(timer);
    timer = undefined;
  }
}

export const startCheckin = () => {
  clearCheckin();
  timer = setTimeout(async () => await checkin(), timeout);
}

export const checkin = async () => {
  try {
    const account = storage.get();
    if (!account || !account.connectionId) {
      return;
    }

    const payload = {
      connectionId: account.connectionId
    };
    const response = await axios.post('/api/authentication/recheckin', payload);
    const { isSuccess } = response.data;
    if (isSuccess) {
      startCheckin();
    } else {
      alert("You have been logged out because your account has logged into another session. Don't recognize this activity? Please contact your upline for assistance.")
      store.dispatch(logout());
    }
  }
  catch (e) {
    handleException(e);
  }
}