import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { success, error } from 'components/toast/reducer';
import { handleException } from 'utils/ExceptionUtils';
import { post } from 'services/http';
import { UserModel } from '../reducer';
import { CryptoJS } from 'utils/FunctionUtils';

type ResetPasswordProps = {
  custId: number;
  password: string;
  confirmPassword: string;
};

type State = {
  user?: UserModel;
};

const initialState: State = {};
const slice = createSlice({
  name: 'reset-user-password',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ user: UserModel }>) => {
      state.user = action.payload.user;
    },
    closeModal: (state) => {
      state.user = undefined;
    },
  },
});

export const { openModal, closeModal } = slice.actions;

export const resetPassword = (
  values: ResetPasswordProps,
  callback: Func,
) => async (dispatch: AppDispatch) => {
  try {
    const payload = {
      apiKey: 'user-management:update-user',
      data: {
        custId: values.custId,
        userPwd: CryptoJS.CfsEnCode(values.password),
      },
    };
    const response = await post<ResultData>('/simple-api/command', payload);
    const { isSuccess, errMsg } = response.data;
    if (isSuccess) {
      dispatch(success('Updated successfully'));
      dispatch(closeModal());
    } else {
      dispatch(error(errMsg));
    }
  } catch (e) {
    handleException(e);
  } finally {
    callback();
  }
};

export default slice.reducer;
