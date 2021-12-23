import storage from 'services/storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { start, stop } from 'services/connection';
import { post } from 'services/http';
import { Account } from 'services/storage';
import { CryptoJS } from 'utils/FunctionUtils';
import { history } from 'app/routes';

type State = {
  message?: string;
  isLoading: boolean;
};

export type LoginProps = {
  username: string;
  password: string;
};

type LoginData = ResultData & Account;

const sliceName = 'authentication';
const initialState: State = { isLoading: false, message: '' };

export const login = createAsyncThunk<
  Account,
  LoginProps,
  {
    rejectValue: string;
  }
>(`${sliceName}/login`, async (values, { rejectWithValue }) => {
  const payload = {
    username: values.username.trim(),
    password: CryptoJS.CfsEnCode(values.password),
  };
  const response = await post<LoginData>('/api/account/login', payload);
  const data = response.data;
  const { userId, isAdmin, token, isSuccess, errMsg } = data;
  if (isSuccess) {
    return {
      username: payload.username,
      userId,
      isAdmin,
      token,
    };
  } else {
    return rejectWithValue(errMsg);
  }
});

export const logout = createAsyncThunk<void>(
  `${sliceName}/logout`,
  async () => {
    await post('/api/account/logout', {});
  },
);

const postLogout = () => {
  stop();
  storage.remove();
  setTimeout(() => {
    history.replace('/login');
  }, 1);
};

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.message = undefined;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      start();
      const account = action.payload;
      storage.save(account);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.message = action.payload;
    });
    builder.addCase(logout.pending, () => {
      stop();
    });
    builder.addCase(logout.fulfilled, () => {
      postLogout();
    });
    builder.addCase(logout.rejected, () => {
      postLogout();
    });
  },
});

export default slice.reducer;
