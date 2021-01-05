import { createSlice } from '@reduxjs/toolkit';
import { success, error } from '../../../common/components/toast/reducer';
import { query } from '../reducer';
import { handleException } from '../../../common/utils/ExceptionUtils';
import { post } from '../../../common/services/http';

const CryptoJS = require('../../../common/libs/CryptoJS');

export type AddNewUserProps = {
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  groupId: number
};

type State = {
  isOpen: boolean;
};

const initialState: State = {
  isOpen: false
};
const slice = createSlice({
  name: 'add-new-user',
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    }
  }
});

export const { toggleModal } = slice.actions;

export const add = (values: AddNewUserProps, callback: Func) => async (dispatch: AppDispatch) => {
  try {
    const payload = {
      apiKey: 'user-management:add-new-user',
      data: {
        username: values.username,
        userPwd: CryptoJS.CfsEnCode(values.password),
        firstName: values.firstName,
        lastName: values.lastName,
        groupId: values.groupId,
        isAddNew: true
      }
    };
    const response = await post<ResultData>('/simple-api/command', payload);
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