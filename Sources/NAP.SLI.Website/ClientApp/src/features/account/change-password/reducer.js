import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
const CryptoJS = require('../../../common/libs/CryptoJS');

const slice = createSlice({
  name: 'change-password',
  initialState: {
    isLoading: false,
    isOpen: false,
    isSuccess: false,
    message: ''
  },
  reducers: {
    changePasswordRequest: (state) => {
      state.isLoading = true;
    },
    changePasswordFailure: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.payload.message;
    },
    changePasswordSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.message;
    },
    toggleChangePasswordModal: (state) => {
      state.isOpen = !state.isOpen;
    }
  },
});

export const { changePasswordRequest, changePasswordFailure, changePasswordSuccess, toggleChangePasswordModal } = slice.actions;

export const changePassword = (oldPassword, newPassword) => async (dispatch) => {
  const payload = {
    apiKey: 'account:change-password',
    data: {
      oldPassword: CryptoJS.CfsEnCode(oldPassword),
      newPassword: CryptoJS.CfsEnCode(newPassword)
    }
  };
  dispatch(changePasswordRequest());

  try {
    const response = await axios.post('/simple-api/command', payload);
    var data = response.data;
    if (data.isSuccess) {
      dispatch(changePasswordSuccess({ message: 'Password changed successfully' }));
    } else {
      dispatch(changePasswordFailure({ message: data.errMsg }));
    }
  } catch (response) {
    dispatch(changePasswordFailure({ message: data.errMsg }));
  }
}

export const showError = (message) => (dispatch) => dispatch(changePasswordFailure({ message }));

export default slice.reducer;