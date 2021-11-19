import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { post } from 'services/http';
import { CryptoJS } from 'utils/FunctionUtils';

export type AddNewUserProps = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
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
        username: values.username,
        userPwd: CryptoJS.CfsEnCode(values.password),
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
      };
      const response = await post<ResultData>(
        '/api/user-management/add',
        payload,
      );
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
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleModal } = slice.actions;

export default slice.reducer;
