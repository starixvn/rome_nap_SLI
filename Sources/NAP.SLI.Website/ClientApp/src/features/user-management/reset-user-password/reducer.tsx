// @ts-nocheck
import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { success, error } from '../../../common/components/toast/reducer';
import { handleException } from '../../../common/utils/ExceptionUtils';

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
  catch (e) {
    handleException(e);
  }
  finally {
    callback();
    dispatch(toggleModal());
  }
}

export default slice.reducer;