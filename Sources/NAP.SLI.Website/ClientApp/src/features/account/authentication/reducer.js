import axios from 'axios';
import storage from './storage';
const CryptoJS = require('../../../common/libs/CryptoJS');

const ActionTypes = {
  LOGIN_REQUEST: 'AUTHENTICATION_LOGIN_REQUEST',
  LOGIN_SUCCESS: 'AUTHENTICATION_LOGIN_SUCCESS',
  LOGIN_FAILURE: 'AUTHENTICATION_LOGIN_FAILURE',
  LOGOUT: 'AUTHENTICATION_LOGOUT'
}

const installAxiosIntercepts = () => {
  axios.interceptors.request.use(
    config => {
      const account = storage.get();
      const token = account?.token;
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
        logout();
      }

      return Promise.reject(error.response);
    });
}

installAxiosIntercepts();
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
      const { groupId, token } = response.data;
      Object.assign(account, { groupId, token });
      storage.save(account);
      dispatch({ type: ActionTypes.LOGIN_SUCCESS, data: { account } });
    } catch (response) {
      dispatch({ type: ActionTypes.LOGIN_FAILURE, data: { message: response.data } });
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
      return {
        loggingIn: false,
        loggedIn: false
      };
    default:
      return state;
  }
};
