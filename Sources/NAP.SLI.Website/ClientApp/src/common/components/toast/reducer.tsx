import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = {
  message?: string;
  color: string;
};

const initialState: State = {
  color: 'primary'
};

let timeout: NodeJS.Timeout | undefined;

const clearTimer = () => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = undefined;
  }
}

const autoHide = () => (dispatch: AppDispatch) => {
  clearTimer();
  timeout = setTimeout(() => dispatch(hide()), 3000);
}

const slice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    show: (state, action: PayloadAction<{ message: string; color: string }>) => {
      const { message, color } = action.payload;
      state.message = message;
      state.color = color;
    },
    hide: (state) => {
      state.message = undefined;
      clearTimer();
    }
  }
});

export const { show, hide } = slice.actions;

export const success = (message: string) => (dispatch: AppDispatch) => {
  dispatch(show({ message, color: 'success' }));
  dispatch(autoHide());
}

export const info = (message: string) => (dispatch: AppDispatch) => {
  dispatch(show({ message, color: 'info' }));
  dispatch(autoHide());
}

export const error = (message: string) => (dispatch: AppDispatch) => {
  dispatch(show({ message, color: 'danger' }));
  dispatch(autoHide());
}

export default slice.reducer;