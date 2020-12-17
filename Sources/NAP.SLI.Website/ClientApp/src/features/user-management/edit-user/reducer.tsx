// @ts-nocheck
import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { success, error } from '../../../common/components/toast/reducer';
import { patchUser } from '../reducer';
import { handleException } from '../../../common/utils/ExceptionUtils';

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
    }
  }
});

export const { toggleModal } = slice.actions;

export const update = (values, callback) => async (dispatch) => {
  try {
    const data = {
      custId: values.custId,
      firstName: values.firstName,
      lastName: values.lastName,
      groupId: parseInt(values.groupId)
    };
    const payload = {
      apiKey: 'user-management:update-user',
      data
    };
    const response = await axios.post('/simple-api/command', payload);
    const { isSuccess, errMsg } = response.data;
    if (isSuccess) {
      dispatch(success('Updated successfully'));
      dispatch(toggleModal());
      dispatch(patchUser({ data }));
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