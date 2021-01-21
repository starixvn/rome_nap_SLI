import { createSlice } from '@reduxjs/toolkit';
import { success, error } from 'components/toast/reducer';
import { handleException } from 'utils/ExceptionUtils';
import { post } from 'services/http';
import { CryptoJS } from 'utils/FunctionUtils';

type ChangePasswordProps = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const slice = createSlice({
  name: 'change-password',
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleModal } = slice.actions;

export const changePassword = (
  values: ChangePasswordProps,
  callback: Func,
) => async (dispatch: AppDispatch) => {
  try {
    const payload = {
      apiKey: 'account:change-password',
      data: {
        oldPassword: CryptoJS.CfsEnCode(values.oldPassword),
        newPassword: CryptoJS.CfsEnCode(values.newPassword),
      },
    };
    const response = await post<ResultData>('/simple-api/command', payload);
    const { isSuccess, errMsg } = response.data;
    if (isSuccess) {
      dispatch(success('Password changed successfully'));
      dispatch(toggleModal());
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
