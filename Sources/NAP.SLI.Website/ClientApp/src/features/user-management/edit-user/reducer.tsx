import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserModel } from '../reducer';
import { post } from 'services/http';

type State = {
  user?: UserModel;
};

export type UpdateProps = {
  custId: number;
  firstName: string;
  lastName: string;
  email: string;
};

type UpdateData = ResultData & {
  custId: number;
};

const initialState: State = {};
const sliceName = 'edit-user';

export const update = createAsyncThunk<UpdateData, UpdateProps>(
  `${sliceName}/update`,
  async (values) => {
    const { data } = await post<UpdateData>(
      '/api/user-management/update-info',
      values,
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
