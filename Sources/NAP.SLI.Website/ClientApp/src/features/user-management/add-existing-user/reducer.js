import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { success, error } from '../../../common/components/toast/reducer';
import { query } from '../reducer';

const slice = createSlice({
  name: 'add-existing-user',
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
      groupId: values.groupId,
      isAddNew: false
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