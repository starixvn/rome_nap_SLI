import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { success, error } from '../../../common/components/toast/reducer';
import { patchUser, UserModel } from '../reducer';
import { handleException } from '../../../common/utils/ExceptionUtils';
import { Dispatch } from 'react';


const slice = createSlice({
  name: 'edit-user',
  initialState: {
    user: {} as UserModel,
    isOpen: false
  },
  reducers: {
    toggleModal: (state?, action?) => {
      state.isOpen = !state.isOpen;
      state.user = action.payload.data as UserModel
    }
  }
});

export const { toggleModal } = slice.actions;

export const update = (values: UserModel, callback: Func) => async (dispatch: Dispatch<any>) => {
  try {
    const data = {
      custId: values.custId,
      firstName: values.firstName,
      lastName: values.lastName,
      groupId: values.groupId
    } as UserModel;
    const payload = {
      apiKey: 'user-management:update-user',
      data
    };
    const response = await axios.post('/simple-api/command', payload);
    const { isSuccess, errMsg } = response.data;
    if (isSuccess) {
      dispatch(success('Updated successfully'));
      dispatch(toggleModal(payload));
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
  }
}

export default slice.reducer;