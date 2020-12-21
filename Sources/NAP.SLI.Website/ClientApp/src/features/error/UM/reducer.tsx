// @ts-nocheck
import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { handleException } from '../../../common/utils/ExceptionUtils';
import store from '../../../store';
import { history } from '../../../App';
import { RouteLinks } from '../../../common/utils/RouteUtils';
import { stopCheckin, startCheckin } from '../../account/authentication/services/connection';
import { stopRefreshToken, startRefreshToken } from '../../account/authentication/services/token';

export type UMTIme = {
  from: string;
  to: string;
  isUnderMaintenanceTime: boolean;
};

const umTime: UMTIme = {
  from: '',
  to: '',
  isUnderMaintenanceTime: false
};
const slice = createSlice({
  name: 'um',
  initialState: {
    umTime
  },
  reducers: {
    checkSuccess: (state, action) => {
      const { umTime } = action.payload;
      state.umTime = umTime;
      if (umTime.isUnderMaintenanceTime) {
        stopCheckin();
        stopRefreshToken();
        startCheckUM(umTime);
      } else {
        startCheckin();
        startRefreshToken();
        stopCheckUM();
      }
    }
  }
});

export const { checkStopped, checkSuccess } = slice.actions;

let timeout: Timeout;
const timeoutInterval = 10000;

export const stopCheckUM = () => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = undefined;
  }
};

export const startCheckUM = async (currentUMTime) => {
  stopCheckUM();
  timeout = setTimeout(async () => await checkUM(currentUMTime), timeoutInterval);
}

const checkUM = async (currentUMTime) => {
  try {
    const response = await axios.post('/api/common/umtime');
    const umTime: UMTIme = response.data;
    if (JSON.stringify(currentUMTime) !== JSON.stringify(umTime)) {
      store.dispatch(checkSuccess({ umTime }));
    } else {
      timeout = setTimeout(async () => await checkUM(currentUMTime), timeoutInterval);
    }
  }
  catch (e) {
    handleException(e);
    timeout = setTimeout(async () => await checkUM(currentUMTime), timeoutInterval);
  }
}

export default slice.reducer;