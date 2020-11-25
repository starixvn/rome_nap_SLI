import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
const CryptoJS = require('../../../common/libs/CryptoJS');
import { success, error } from '../../../common/components/toast/reducer';

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

export const add = (values) => async (dispatch) => {
  const payload = {
    apiKey: 'user-management:add-new-user',
    data: {
      userName: values.username,
      userPwd: CryptoJS.CfsEnCode(values.password),
      firstName: values.firstname ?? "",
      lastName: values.lastname ?? "",
      groupId: values.groupId,
      isAddNew: true
    }
  };

  var response = await axios.post('/simple-api/command', payload);
  const { isSuccess, message } = response.data;
  if (isSuccess) {
    dispatch(success('Success'));
  } else {
    dispatch(error(message));
  }
}

export default slice.reducer;