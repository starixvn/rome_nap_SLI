import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
const CryptoJS = require('../../../common/libs/CryptoJS');

const slice = createSlice({
  name: 'sidebar',
  initialState: {
    isOpen: false
  },
  reducers: {
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
    addRequest: (state) => {
      state.isLoading = false;
    },
    addSuccess: (state) => {
      state.isLoading = false;
    },
    addFailure: (state) => {
      state.isLoading = false;
    }
  }
});

export const { toggleModal, addRequest, addSuccess, addFailure } = slice.actions;

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

  dispatch(addRequest());
  var response = await axios.post('/simple-api/command', payload);
  if (response.data.isSuccess) {
    dispatch(addSuccess());
  } else {
    dispatch(addFailure());
  }
}

export default slice.reducer;