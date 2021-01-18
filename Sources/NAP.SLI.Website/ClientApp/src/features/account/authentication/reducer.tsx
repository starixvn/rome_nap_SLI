import storage from '../../../common/services/storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleException } from '../../../common/utils/ExceptionUtils';
import { stopRefreshToken, refreshToken } from '../../../common/services/token';
import { stopCheckin, checkin } from '../../../common/services/connection';
import { post } from '../../../common/services/http';
import { Account } from '../../../common/services/storage';
import { CryptoJS } from '../../../common/utils/FunctionUtils';

type State = {
  account?: Account;
  message: string;
  isLoading: boolean;
};

const account = storage.get();
const initialState: State = account
  ? { isLoading: false, account, message: '' }
  : { isLoading: false, message: '' };

const slice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    loginFailure: (state, action: PayloadAction<{ message: string }>) => {
      state.message = action.payload.message;
    },
    loginSuccess: (state, action: PayloadAction<{ account: Account }>) => {
      state.account = action.payload.account;
      state.message = '';
    },
    logoutSuccess: (state) => {
      state.account = undefined;
    },
  },
});

export const { loginFailure, loginSuccess, logoutSuccess } = slice.actions;

type LoginRequest = {
  username: string;
  password: string;
};

type LoginData = ResultData & {
  userId: number;
  groupId: number;
  token: string;
  connectionId: string;
};

export const login = (values: LoginRequest, callback: Func) => async (
  dispatch: AppDispatch,
) => {
  try {
    const payload = {
      username: values.username.trim(),
      password: CryptoJS.CfsEnCode(values.password),
    };
    const response = await post<LoginData>(
      '/api/authentication/login',
      payload,
    );
    const {
      userId,
      groupId,
      token,
      isSuccess,
      errMsg,
      connectionId,
    } = response.data;
    if (isSuccess) {
      const account = {
        username: payload.username,
        userId,
        groupId,
        token,
        connectionId,
      };
      storage.save(account);
      dispatch(loginSuccess({ account }));
    } else {
      dispatch(loginFailure({ message: errMsg }));
    }
  } catch (e) {
    handleException(e);
  } finally {
    callback();
  }
};

export const logout = () => (dispatch: AppDispatch) => {
  stopCheckin();
  stopRefreshToken();
  storage.remove();
  dispatch(logoutSuccess());
};

if (account) {
  window.setTimeout(async () => {
    await refreshToken();
    await checkin();
  }, 1);
}

export default slice.reducer;
