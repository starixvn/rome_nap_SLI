import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
const CryptoJS = require('../../../common/libs/CryptoJS');

const slice = createSlice({
  name: 'reset-user-password',
  initialState: {
    user: {},
    isOpen: false
  },
  reducers: {
    toggleModal: (state, action) => {
      state.isOpen = !state.isOpen;
      if (action.payload) {
        state.user = action.payload.user;
      }
    },
    resetPasswordRequest: (state) => {
      state.isLoading = false;
    },
    resetPasswordSuccess: (state) => {
      state.isLoading = false;
    },
    resetPasswordFailure: (state) => {
      state.isLoading = false;
    }
  }
});

export const { toggleModal, resetPasswordRequest, resetPasswordSuccess, resetPasswordFailure } = slice.actions;

export const resetPassword = (values) => async (dispatch) => {
  const payload = {
    apiKey: 'user-management:update-user',
    data: {
      custId: values.custId,
      userPwd: CryptoJS.CfsEnCode(values.newPassword)
    }
  };

  dispatch(resetPasswordRequest());
  const response = await axios.post('/simple-api/command', payload);
  if (response.data.isSuccess) {
    dispatch(resetPasswordSuccess());
  } else {
    dispatch(resetPasswordFailure());
  }
}

export default slice.reducer;