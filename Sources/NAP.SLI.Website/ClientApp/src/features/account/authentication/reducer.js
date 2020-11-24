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
    loginRequest: (state) => {
      state.isLoading = true;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.account = action.payload.account;
      state.message = '';
    },
    logoutSuccess: (state) => {
      state.isLoading = false;
      state.account = undefined;
    }
  },
});

export const { loginRequest, loginFailure, loginSuccess, logoutSuccess } = slice.actions;

export const login = (username, password) => async (dispatch) => {
  if (!username) {
    dispatch(loginFailure({ message: 'Please enter username' }));
    return;
  }

  if (!password) {
    dispatch(loginFailure({ message: 'Please enter password' }));
    return;
  }

  const account = {
    username
  };
  dispatch(loginRequest());

  try {
    const payload = {
      username,
      password: CryptoJS.CfsEnCode(password)
    };
    const response = await axios.post('/api/authentication/login', payload);
    const { userId, groupId, token } = response.data;
    Object.assign(account, { userId, groupId, token });
    storage.save(account);
    dispatch(loginSuccess({ account }));
  } catch (error) {
    dispatch(loginFailure({ message: error.message }));
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