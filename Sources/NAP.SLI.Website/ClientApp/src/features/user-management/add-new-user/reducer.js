import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
const CryptoJS = require('../../../common/libs/CryptoJS');
import { success, error } from '../../../common/components/toast/reducer';
import { query } from '../reducer';

const slice = createSlice({
  name: 'add-new-user',
  initialState: {
    isOpen: false
  },
  reducers: {
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    }
  }
});

export const { toggleModal } = slice.actions;

export const add = (values, callback) => async (dispatch) => {
  const payload = {
    apiKey: 'user-management:add-new-user',
    data: {
      userName: values.userName,
      userPwd: CryptoJS.CfsEnCode(values.password),
      firstName: values.firstName,
      lastName: values.lastName,
      groupId: values.groupId,
      isAddNew: true
    }
  };

  var response = await axios.post('/simple-api/command', payload);
  callback();
  const { isSuccess, errMsg } = response.data;
  if (isSuccess) {
    dispatch(success('Added successfully'));
    dispatch(toggleModal());
    dispatch(query());
  } else {
    dispatch(error(errMsg));
  }
}

export default slice.reducer;