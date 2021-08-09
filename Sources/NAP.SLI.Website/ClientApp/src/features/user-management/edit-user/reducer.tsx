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
  groupId: number;
};

type UpdateData = ResultData & {
  custId: number;
  groupId: number;
};

const initialState: State = {};
const sliceName = 'edit-user';

export const update = createAsyncThunk<UpdateData, UpdateProps>(
  `${sliceName}/update`,
  async (updateProps, { rejectWithValue }) => {
    try {
      const payload = {
        apiKey: 'user-management:update-user',
        data: updateProps,
      };
      const response = await post<UpdateData>('/simple-api/command', payload);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
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
