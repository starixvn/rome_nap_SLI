import axios from 'axios';
import storage from './services/storage';
import { createSlice } from '@reduxjs/toolkit';
import { handleException } from '../../../common/utils/ExceptionUtils';
import { stopRefreshToken, refreshToken } from './services/token';
import { stopCheckin, checkin } from './services/connection';

const CryptoJS = require('../../../common/libs/CryptoJS');
import { Dispatch } from 'react';

type Props = {
  account: any,
  message: string,
  isLoading: boolean
}

const account = storage.get();
const slice = createSlice({
  name: 'authentication',
  initialState: (account ? { isLoading: false, account, message: "" } : { isLoading: false }) as Props,
  reducers: {
    loginFailure: (state, action) => {
      state.message = action.payload.message;
    },
    loginSuccess: (state, action) => {
      state.account = action.payload.account;
      state.message = '';
    },
    logoutSuccess: (state) => {
      state.account = undefined;
    }
  }
});

export const { loginFailure, loginSuccess, logoutSuccess } = slice.actions;

export const login = (values: any, callback: Func) => async (dispatch : Dispatch<any>) => {
  try {
    const payload = {
      username: values.userName.trim(),
      password: CryptoJS.CfsEnCode(values.password)
    };

    const response = await axios.post('/api/authentication/login', payload);
    const { userId, groupId, token, isSuccess, errMsg, connectionId } = response.data;
    if (isSuccess) {
      const account = {
        username: payload.username,
        userId,
        groupId,
        token,
        connectionId
      }
      storage.save(account);
      dispatch(loginSuccess({ account }));
    } else {
      dispatch(loginFailure({ message: errMsg }));
    }
  }
  catch (e) {
    handleException(e);
  }
  finally {
    callback();
  }
}

export const logout = () => (dispatch: Dispatch<any>) => {
  stopCheckin();
  stopRefreshToken();
  storage.remove();
  dispatch(logoutSuccess());
}

if (account) {
  setTimeout(async () => {
    await refreshToken();
    await checkin();
  }, 1);
}

export default slice.reducer;