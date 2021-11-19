import storage from 'services/storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { stopCheckin, checkin } from 'services/connection';
import { post } from 'services/http';
import { Account } from 'services/storage';
import { CryptoJS } from 'utils/FunctionUtils';
import { AxiosError } from 'axios';

type State = {
  account?: Account;
  message?: string;
  isLoading: boolean;
};

export type LoginProps = {
  username: string;
  password: string;
};

type LoginData = ResultData & Account;

const sliceName = 'authentication';
const account = storage.get();
const initialState: State = account
  ? { isLoading: false, account, message: '' }
  : { isLoading: false, message: '' };

export const login = createAsyncThunk<
  Account,
  LoginProps,
  {
    rejectValue: string;
  }
>(`${sliceName}/login`, async (values, { rejectWithValue }) => {
  try {
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
  } catch (err) {
    const error: AxiosError<string> = err;
    if (!error.response) {
      throw err;
    }

    return rejectWithValue(error.response.data);
  }
});

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    logout: (state) => {
      stopCheckin();
      storage.remove();
      state.account = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.message = undefined;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      const account = action.payload;
      storage.save(account);
      state.account = account;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.message = action.payload;
    });
  },
});

export const { logout } = slice.actions;

if (account) {
  window.setTimeout(async () => {
    await checkin();
  }, 1);
}

export default slice.reducer;
