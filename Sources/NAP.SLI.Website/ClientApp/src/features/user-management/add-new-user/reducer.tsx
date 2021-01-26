import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { handleException } from 'utils/ExceptionUtils';
import { post } from 'services/http';
import { CryptoJS } from 'utils/FunctionUtils';

export type AddNewUserProps = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  groupId: number;
};

type State = {
  isOpen: boolean;
};

const initialState: State = {
  isOpen: false,
};
const sliceName = 'add-new-user';

export const addNew = createAsyncThunk<ResultData, AddNewUserProps>(
  `${sliceName}/add`,
  async (values, { rejectWithValue }) => {
    try {
      const payload = {
        apiKey: 'user-management:add-new-user',
        data: {
          username: values.username,
          userPwd: CryptoJS.CfsEnCode(values.password),
          firstName: values.firstName,
          lastName: values.lastName,
          groupId: values.groupId,
          isAddNew: true,
        },
      };
      const response = await post<ResultData>('/simple-api/command', payload);
      return response.data;
    } catch (err) {
      handleException(err);
      return rejectWithValue(err);
    }
  },
);

const slice = createSlice({
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
