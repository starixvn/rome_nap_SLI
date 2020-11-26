import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
const CryptoJS = require('../../../common/libs/CryptoJS');
import { success, error } from '../../../common/components/toast/reducer';

const slice = createSlice({
  name: 'change-password',
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    }
  },
});

export const { toggleModal } = slice.actions;

export const changePassword = (values, callback) => async (dispatch) => {
  try {
    const payload = {
      apiKey: 'account:change-password',
      data: {
        oldPassword: CryptoJS.CfsEnCode(values.oldPassword),
        newPassword: CryptoJS.CfsEnCode(values.newPassword)
      }
    };
    const response = await axios.post('/simple-api/command', payload);
    const { isSuccess, errMsg } = response.data;
    if (isSuccess) {
      dispatch(success('Password changed successfully'));
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