import axios from 'axios';
const CryptoJS = require('../shared/CryptoJS');

const ActionTypes = {
  CHANGE_PASSWORD_TOGGLE_MODAL: 'CHANGE_PASSWORD_TOGGLE_MODAL',
  CHANGE_PASSWORD_REQUEST: 'CHANGE_PASSWORD_REQUEST',
  CHANGE_PASSWORD_SUCCESS: 'CHANGE_PASSWORD_SUCCESS',
  CHANGE_PASSWORD_FAILURE: 'CHANGE_PASSWORD_FAILURE'
}

const initialState = { isChangePasswordOpen: false };

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

export const accountActions = {
  toggleChangePasswordModal: () => ({ type: ActionTypes.CHANGE_PASSWORD_TOGGLE_MODAL }),
  showError,
  changePassword
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_PASSWORD_TOGGLE_MODAL:
      return {
        ...state,
        isChangePasswordOpen: !state.isChangePasswordOpen
      };
    case ActionTypes.CHANGE_PASSWORD_REQUEST:
      return {
        ...state
      };
    case ActionTypes.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        message: action.data.message
      };
    case ActionTypes.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        isSuccessful: false,
        message: action.data.message
      };
    default:
      return state;
  }
};
