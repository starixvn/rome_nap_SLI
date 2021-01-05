import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { patchUser, UserModel } from '../reducer';
import { handleException } from '../../../common/utils/ExceptionUtils';
import { success, error } from '../../../common/components/toast/reducer';
import { post } from '../../../common/services/http';

type State = {
  user?: UserModel;
};

const initialState: State = {};
const slice = createSlice({
  name: 'edit-user',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ user: UserModel }>) => {
      state.user = action.payload.user;
    },
    closeModel: (state) => {
      state.user = undefined;
    }
  }
});

export const { openModal, closeModel } = slice.actions;

type UpdateProps = {
  custId: number;
  firstName: string;
  lastName: string;
  groupId: number;
};

type UpdateData = ResultData & {
  custId: number;
  groupId: number;
};

export const update = (values: UpdateProps, callback: Func) => async (dispatch: AppDispatch) => {
  try {
    const data = values;
    const payload = {
      apiKey: 'user-management:update-user',
      data
    };
    const response = await post<UpdateData>('/simple-api/command', payload);
    const { isSuccess, errMsg } = response.data;
    if (isSuccess) {
      dispatch(success('Updated successfully'));
      dispatch(closeModel());
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