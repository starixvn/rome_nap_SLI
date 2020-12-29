import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { handleException } from '../../../common/utils/ExceptionUtils';
import store from '../../../store';

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
        startCheckUM(umTime);
      } else {
        stopCheckUM();
      }
    }
  }
});

export const { checkSuccess } = slice.actions;

let timeout: NodeJS.Timeout;
const timeoutInterval = 10000;

export const stopCheckUM = () => {
  if (timeout) {
    clearTimeout(timeout);
  }
};

export const startCheckUM = async (currentUMTime: UMTIme) => {
  stopCheckUM();
  timeout = setTimeout(async () => await checkUM(currentUMTime), timeoutInterval);
}

const checkUM = async (currentUMTime: UMTIme) => {
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