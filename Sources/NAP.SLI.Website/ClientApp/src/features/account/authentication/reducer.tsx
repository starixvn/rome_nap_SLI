import storage from 'services/storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { stopCheckin, checkin } from 'services/connection';
import { post } from 'services/http';
import { Account } from 'services/storage';
import { CryptoJS } from 'utils/FunctionUtils';

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
    try {
      await post('/api/account/logout', {});
    } catch (err) {
      console.error(err);
    }
  },
);

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
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
    builder.addCase(logout.pending, () => {
      stopCheckin();
    });
    builder.addCase(logout.fulfilled, (state) => {
      storage.remove();
      state.account = undefined;
    });
  },
});

if (account) {
  window.setTimeout(async () => {
    await checkin();
  }, 1);
}

export default slice.reducer;
