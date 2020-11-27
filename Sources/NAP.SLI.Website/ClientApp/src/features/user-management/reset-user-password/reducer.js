import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { success, error } from '../../../common/components/toast/reducer';

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
    }
  }
});

export const { toggleModal, resetPasswordRequest, resetPasswordSuccess, resetPasswordFailure } = slice.actions;

export const resetPassword = (values, callback) => async (dispatch) => {
  try {
    const payload = {
      apiKey: 'user-management:update-user',
      data: {
        custId: values.custId,
        userPwd: CryptoJS.CfsEnCode(values.password)
      }
    };
    const response = await axios.post('/simple-api/command', payload);
    const { isSuccess, errMsg } = response.data;
    if (isSuccess) {
      dispatch(success('Updated successfully'));
      dispatch(toggleModal());
    } else {
      dispatch(error(errMsg));
    }
  }
  finally {
    callback();
  }
}

export default slice.reducer;