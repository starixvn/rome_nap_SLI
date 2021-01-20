import { createSlice } from '@reduxjs/toolkit';
import { success, error } from '../../../common/components/toast/reducer';
import { query } from '../reducer';
import { handleException } from '../../../common/utils/ExceptionUtils';
import { post } from '../../../common/services/http';

export type AddExistingUserProps = {
  username: string;
  groupId: number;
};

type State = {
  isOpen: boolean;
};

const initialState: State = {
  isOpen: false,
};
export const slice = createSlice({
  name: 'add-existing-user',
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleModal } = slice.actions;

export const add = (
  values: AddExistingUserProps,
  callback: Func,
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const payload = {
      apiKey: 'user-management:add-new-user',
      data: {
        username: values.username,
        groupId: values.groupId,
        isAddNew: false,
      },
    };
    const response = await post<ResultData>('/simple-api/command', payload);
    console.log(response);
    const { isSuccess, errMsg } = response.data;
    if (isSuccess) {
      console.log('success1');
      dispatch(success('Added successfully'));
      console.log('success2');
      console.log('toggleModal1');
      dispatch(toggleModal());
      console.log('toggleModal2');
      console.log('query1');
      dispatch(query());
      console.log('query2');
    } else {
      dispatch(error(errMsg));
    }
  } catch (e) {
    console.log('handleException');
    handleException(e);
  } finally {
    callback();
  }
};

export default slice.reducer;
