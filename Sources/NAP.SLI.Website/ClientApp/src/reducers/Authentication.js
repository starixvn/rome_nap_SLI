import axios from 'axios';
const CryptoJS = require('../shared/CryptoJS');

const ActionTypes = {
  LOGIN_REQUEST: 'AUTHENTICATION_LOGIN_REQUEST',
  LOGIN_SUCCESS: 'AUTHENTICATION_LOGIN_SUCCESS',
  LOGIN_FAILURE: 'AUTHENTICATION_LOGIN_FAILURE',
  LOGOUT: 'AUTHENTICATION_LOGOUT'
}

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggingIn: false, loggedIn: true, user } : { loggingIn: false, loggedIn: false };

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

    const user = {
      username
    };
    dispatch({ type: ActionTypes.LOGIN_REQUEST, data: { user } });

    try {
      const payload = {
        username,
        password: CryptoJS.CfsEnCode(password)
      };
      const response = await axios.post('/api/authentication/login', payload);
      const { groupId, token } = response.data;
      Object.assign(user, { groupId, token });
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: ActionTypes.LOGIN_SUCCESS, data: { user } });
    } catch (response) {
      dispatch({ type: ActionTypes.LOGIN_FAILURE, data: { message: response.data } });
    }
  };
}

const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('user');
    dispatch({ type: ActionTypes.LOGOUT });
  }
}

export const authenticationActions = {
  login,
  logout
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return {
        loggingIn: true,
        loggedIn: false,
        user: action.data.user
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
        user: action.data.user,
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
