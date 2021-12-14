import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { post } from 'services/http';
import { CryptoJS } from 'utils/FunctionUtils';

export type ChangePasswordProps = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const sliceName = 'change-password';

export const changePassword = createAsyncThunk<ResultData, ChangePasswordProps>(
  `${sliceName}/change-password`,
  async (values, { rejectWithValue }) => {
    try {
      const payload = {
        oldPassword: CryptoJS.CfsEnCode(values.oldPassword),
        newPassword: CryptoJS.CfsEnCode(values.newPassword),
      };
      const { data } = await post<ResultData>(
        '/api/account/change-password',
        payload,
      );
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const slice = createSlice({
  name: sliceName,
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

export default slice.reducer;
