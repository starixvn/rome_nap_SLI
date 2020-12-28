import axios from 'axios';
import { handleException } from "../../../../common/utils/ExceptionUtils";
import storage from './storage';
import { logout } from '../reducer';
import store from '../../../../store';

var timeout: NodeJS.Timeout;
const timeoutInterval = 30 * 1000;

export const stopCheckin = () => {
  if (timeout) {
    clearTimeout(timeout);
  }
}

export const startCheckin = () => {
  if (!timeout) {
    timeout = setTimeout(async () => await checkin(), timeoutInterval);
  }
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
      stopCheckin();
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