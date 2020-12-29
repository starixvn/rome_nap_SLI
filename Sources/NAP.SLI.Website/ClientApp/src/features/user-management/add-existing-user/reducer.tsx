import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { success, error } from '../../../common/components/toast/reducer';
import { query } from '../reducer';
import { handleException } from '../../../common/utils/ExceptionUtils';
import { Dispatch } from 'react';

export type AddExistProps = {
  userName: string,
  groupId: number,
  isAddNew: boolean
}

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

export const add = (values: AddExistProps, callback: Func) => async (dispatch: Dispatch<any>) => {
  try {
    const payload = {
      apiKey: 'user-management:add-new-user',
      data: {
        userName: values.userName,
        groupId: values.groupId,
        isAddNew: false
      }
    };
    const response = await axios.post('/simple-api/command', payload);
    const { isSuccess, errMsg } = response.data;
    if (isSuccess) {
      dispatch(success('Added successfully'));
      dispatch(toggleModal());
      dispatch(query());
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