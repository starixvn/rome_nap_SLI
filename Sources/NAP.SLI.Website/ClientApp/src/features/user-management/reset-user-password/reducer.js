import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
const CryptoJS = require('../../../common/libs/CryptoJS');
import { success, error } from '../../../common/components/toast/reducer';

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
  const payload = {
    apiKey: 'user-management:update-user',
    data: {
      custId: values.custId,
      userPwd: CryptoJS.CfsEnCode(values.password)
    }
  };

  const response = await axios.post('/simple-api/command', payload);
  callback();
  const { isSuccess, errMsg } = response.data;
  if (isSuccess) {
    dispatch(success('Updated successfully'));
    dispatch(toggleModal());
  } else {
    dispatch(error(errMsg));
  }
}

export default slice.reducer;