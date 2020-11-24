import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'edit-user',
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
    updateRequest: (state) => {
      state.isLoading = false;
    },
    updateSuccess: (state) => {
      state.isLoading = false;
    },
    updateFailure: (state) => {
      state.isLoading = false;
    }
  }
});

export const { toggleModal, updateRequest, updateSuccess, updateFailure } = slice.actions;

export const update = (values) => async (dispatch) => {
  const payload = {
    apiKey: 'user-management:update-user',
    data: {
      custId: values.custId,
      userName: values.username,
      firstName: values.firstname ?? "",
      lastName: values.lastname ?? "",
      groupId: values.group
    }
  };

  dispatch(updateRequest());
  const response = await axios.post('/simple-api/command', payload);
  if (response.data.isSuccess) {
    dispatch(updateSuccess());
  } else {
    dispatch(updateFailure());
  }
}

export default slice.reducer;