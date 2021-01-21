import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleException } from 'utils/ExceptionUtils';
import { post } from 'services/http';
import store from 'app/store';

export type UMTime = {
  from: string;
  to: string;
  isUnderMaintenanceTime: boolean;
};

const initialState: UMTime = {
  from: '',
  to: '',
  isUnderMaintenanceTime: false,
};
const slice = createSlice({
  name: 'um',
  initialState,
  reducers: {
    checkSuccess: (state, action: PayloadAction<UMTime>) => {
      const umTime = action.payload;
      const { from, to, isUnderMaintenanceTime } = umTime;
      state.from = from;
      state.to = to;
      state.isUnderMaintenanceTime = isUnderMaintenanceTime;
      if (isUnderMaintenanceTime) {
        startCheckUM(umTime);
      } else {
        stopCheckUM();
      }
    },
  },
});

export const { checkSuccess } = slice.actions;

let timeout: number | undefined;
const timeoutInterval = 10000;

export const stopCheckUM = () => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = undefined;
  }
};

export const startCheckUM = async (currentUMTime: UMTime) => {
  stopCheckUM();
  timeout = window.setTimeout(
    async () => await checkUM(currentUMTime),
    timeoutInterval,
  );
};

const checkUM = async (currentUMTime: UMTime) => {
  try {
    const response = await post<UMTime>('/api/common/umtime');
    const umTime = response.data;
    if (JSON.stringify(currentUMTime) !== JSON.stringify(umTime)) {
      store.dispatch(checkSuccess({ ...umTime }));
    } else {
      timeout = window.setTimeout(
        async () => await checkUM(currentUMTime),
        timeoutInterval,
      );
    }
  } catch (e) {
    handleException(e);
    timeout = window.setTimeout(
      async () => await checkUM(currentUMTime),
      timeoutInterval,
    );
  }
};

export default slice.reducer;
