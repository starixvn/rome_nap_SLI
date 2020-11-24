import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'add-existing-user',
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
      username: values.username,
      groupId: values.groupId,
      isAddNew: false
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