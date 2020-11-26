import axios from 'axios';
import storage from './storage';
import { createSlice } from '@reduxjs/toolkit';
import store from '../../../app/store';
const CryptoJS = require('../../../common/libs/CryptoJS');

const refreshTimeout = 10 * 60 * 1000;
let refreshTimer;

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
  const payload = {
    username: values.userName.trim(),
    password: CryptoJS.CfsEnCode(values.password)
  };
  const response = await axios.post('/api/authentication/login', payload);
  callback();
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

export const logout = () => (dispatch) => {
  storage.remove();
  dispatch(logoutSuccess());
}

const installAxiosIntercepts = () => {
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
    error => {
      if (error.response.status === 401) {
        store.dispatch(logout);
      }

      return Promise.reject(error);
    });
}

const clearRefreshTimer = () => {
  if (refreshTimer != null) {
    clearTimeout(refreshTimer);
    refreshTimer = null;
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
      Object.assign(account, { token: response.data.token });
      storage.save(account);
      startRefreshTimer();
    }
  }
  catch {
    store.dispatch(logout());
  }
}

installAxiosIntercepts();
refreshToken();

export default slice.reducer;