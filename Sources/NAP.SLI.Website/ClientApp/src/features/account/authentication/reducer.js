import axios from 'axios';
import storage from './storage';
import store from '../../../app/store';
const CryptoJS = require('../../../common/libs/CryptoJS');

const refreshTimeout = 10 * 60 * 1000;
let refreshTimer;

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
        store.dispatch({ type: ActionTypes.LOGOUT });
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
    store.dispatch({ type: ActionTypes.LOGOUT });
  }
}

installAxiosIntercepts();
refreshToken();

export const ActionTypes = {
  LOGIN_REQUEST: 'AUTHENTICATION_LOGIN_REQUEST',
  LOGIN_SUCCESS: 'AUTHENTICATION_LOGIN_SUCCESS',
  LOGIN_FAILURE: 'AUTHENTICATION_LOGIN_FAILURE',
  LOGIN_SET_MESSAGE: 'AUTHENTICATION_LOGIN_SET_MESSAGE',
  LOGOUT: 'AUTHENTICATION_LOGOUT'
}

const account = storage.get();
const initialState = account ? { loggingIn: false, loggedIn: true, account } : { loggingIn: false, loggedIn: false };

const login = (username, password) => {
  return async (dispatch) => {
    if (!username) {
      dispatch({ type: ActionTypes.LOGIN_FAILURE, data: { message: 'Please enter username' } });
      return;
    }

    if (!password) {
      dispatch({ type: ActionTypes.LOGIN_FAILURE, data: { message: 'Please enter password' } });
      return;
    }

    const account = {
      username
    };
    dispatch({ type: ActionTypes.LOGIN_REQUEST, data: { account } });

    try {
      const payload = {
        username,
        password: CryptoJS.CfsEnCode(password)
      };
      const response = await axios.post('/api/authentication/login', payload);
      const { userId, groupId, token } = response.data;
      Object.assign(account, { userId, groupId, token });
      storage.save(account);
      dispatch({ type: ActionTypes.LOGIN_SUCCESS, data: { account } });
    } catch (error) {
      dispatch({ type: ActionTypes.LOGIN_FAILURE, data: { message: error.response.data } });
    }
  };
}

const logout = () => {
  return (dispatch) => {
    storage.remove();
    dispatch({ type: ActionTypes.LOGOUT });
  }
}

export const actions = {
  login,
  logout
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return {
        loggingIn: true,
        loggedIn: false,
        account: action.data.account
      };
    case ActionTypes.LOGIN_SET_MESSAGE:
      return {
        ...state,
        message: action.data.message
      };
    case ActionTypes.LOGIN_SUCCESS:
      startRefreshTimer();
      return {
        ...state,
        loggingIn: false,
        loggedIn: true,
        account: action.data.account,
        message: ''
      };
    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        loggedIn: false,
        message: action.data.message
      };
    case ActionTypes.LOGOUT:
      clearRefreshTimer();
      return {
        loggingIn: false,
        loggedIn: false
      };
    default:
      return state;
  }
};
