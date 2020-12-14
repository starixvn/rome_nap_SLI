// @ts-nocheck
import axios from 'axios';
import storage from './storage';
import { createSlice } from '@reduxjs/toolkit';
import store from '../../../store';

const CryptoJS = require('../../../common/libs/CryptoJS');

const account = storage.get();
const slice = createSlice({
  name: 'authentication',
  initialState: account ? { isLoading: false, account } : { isLoading: false },
  reducers: {
    loginFailure: (state, action) => {
      state.message = action.payload.message;
    },
    loginSuccess: (state, action) => {
      state.account = action.payload.account;
      state.message = '';
    },
    logoutSuccess: (state) => {
      state.account = undefined;
    }
  },
});

export const { loginFailure, loginSuccess, logoutSuccess } = slice.actions;

export const login = (values, callback) => async (dispatch) => {
  try {
    const payload = {
      username: values.userName.trim(),
      password: CryptoJS.CfsEnCode(values.password)
    };

    const response = await axios.post('/api/authentication/login', payload);
    const { userId, groupId, token, isSuccess, errMsg } = response.data;
    if (isSuccess) {
      const account = {
        username: payload.username,
        userId,
        groupId,
        token
      }
      storage.save(account);
      dispatch(loginSuccess({ account }));
    } else {
      dispatch(loginFailure({ message: errMsg }));
    }
  }
  finally {
    callback();
  }
}

export const logout = () => (dispatch) => {
  storage.remove();
  dispatch(logoutSuccess());
}

let refreshTimer = undefined;
const refreshTimeout = 10 * 60 * 1000;

const clearRefreshTimer = () => {
  if (refreshTimer) {
    clearTimeout(refreshTimer);
    refreshTimer = undefined;
  }
}

const startRefreshTimer = () => {
  clearRefreshTimer();
  refreshTimer = setTimeout(async () => await refreshToken(), refreshTimeout);
}

const refreshToken = async () => {
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
        startRefreshTimer();
      } else {
        store.dispatch(logout());
      }
    }
  }
  catch {
    console.error('Unable to refresh token');
  }
}

if (account) {
  setTimeout(() => refreshToken(), 1);
}

export default slice.reducer;