import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { post } from 'services/http';

export type AddExistingUserProps = {
  username: string;
  groupId: number;
};

export type State = {
  isOpen: boolean;
};

const sliceName = 'add-existing-user';
const initialState: State = {
  isOpen: false,
};

export const addExisting = createAsyncThunk<ResultData, AddExistingUserProps>(
  `${sliceName}/add`,
  async (values, { rejectWithValue }) => {
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
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleModal } = slice.actions;

export default slice.reducer;
