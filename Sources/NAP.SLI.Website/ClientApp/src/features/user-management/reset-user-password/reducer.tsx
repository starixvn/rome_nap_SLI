import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { post } from 'services/http';
import { UserModel } from '../reducer';
import { CryptoJS } from 'utils/FunctionUtils';

export type ResetPasswordProps = {
  custId: number;
  password: string;
  confirmPassword: string;
};

type State = {
  user?: UserModel;
};

const initialState: State = {};
const sliceName = 'reset-user-password';

export const resetPassword = createAsyncThunk<ResultData, ResetPasswordProps>(
  `${sliceName}/reset-user-password`,
  async (values) => {
    const payload = {
      custId: values.custId,
      password: CryptoJS.CfsEnCode(values.password),
    };
    const { data } = await post<ResultData>(
      '/api/user-management/change-password',
      payload,
    );
    return data;
  },
);

const slice = createSlice({
  name: sliceName,
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

export default slice.reducer;
