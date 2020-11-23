import axios from 'axios';
const CryptoJS = require('../../../common/libs/CryptoJS');

const ActionTypes = {
  CHANGE_PASSWORD_TOGGLE: 'CHANGE_PASSWORD_TOGGLE',
  CHANGE_PASSWORD_REQUEST: 'CHANGE_PASSWORD_REQUEST',
  CHANGE_PASSWORD_SUCCESS: 'CHANGE_PASSWORD_SUCCESS',
  CHANGE_PASSWORD_FAILURE: 'CHANGE_PASSWORD_FAILURE'
}

const initialState = { isOpen: false, isLoading: false };

const changePassword = (oldPassword, newPassword) => {
  return async (dispatch) => {
    const payload = {
      apiKey: 'account:change-password',
      data: {
        oldPassword: CryptoJS.CfsEnCode(oldPassword),
        newPassword: CryptoJS.CfsEnCode(newPassword)
      }
    };
    dispatch({ type: ActionTypes.CHANGE_PASSWORD_REQUEST });

    try {
      const response = await axios.post('/simple-api/command', payload);
      var data = response.data;
      if (data.isSuccessful) {
        dispatch({ type: ActionTypes.CHANGE_PASSWORD_SUCCESS, data: { message: 'Password changed successfully' } });
      } else {
        dispatch({ type: ActionTypes.CHANGE_PASSWORD_FAILURE, data: { message: data.errMsg } });
      }
    } catch (response) {
      dispatch({ type: ActionTypes.CHANGE_PASSWORD_FAILURE, data: { message: data.errMsg } });
    }
  };
}

const showError = (message) => ({ type: ActionTypes.CHANGE_PASSWORD_FAILURE, data: { message } });

export const actions = {
  toggle: () => ({ type: ActionTypes.CHANGE_PASSWORD_TOGGLE }),
  showError,
  changePassword
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_PASSWORD_TOGGLE:
      return {
        ...state,
        isOpen: !state.isOpen
      };
    case ActionTypes.CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case ActionTypes.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        message: action.data.message
      };
    case ActionTypes.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        isSuccessful: false,
        message: action.data.message
      };
    default:
      return state;
  }
};
