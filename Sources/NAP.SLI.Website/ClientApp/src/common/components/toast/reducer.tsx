import { createSlice } from '@reduxjs/toolkit';
import { number } from 'prop-types';
import { Dispatch } from 'react';

const slice = createSlice({
  name: 'toast',
  initialState: {
    message: undefined,
    color: 'primary'
  },
  reducers: {
    show: (state, { payload }) => {
      state.message = payload.message;
      state.color = payload.color;
    },
    hide: (state) => {
      state.message = undefined;
    }
  }
});

export const { show, hide } = slice.actions;

var timeout: NodeJS.Timeout;
const autoHide = () => (dispatch: Dispatch<any>) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => dispatch(hide()), 3000);
}

export const success = (message: string) => (dispatch: Dispatch<any>) => {
  dispatch(show({ message, color: 'success' }));
  dispatch(autoHide());
}

export const info = (message: string) => (dispatch: Dispatch<any>) => {
  dispatch(show({ message, color: 'info' }));
  dispatch(autoHide());
}

export const error = (message: string) => (dispatch: Dispatch<any>) => {
  dispatch(show({ message, color: 'danger' }));
  dispatch(autoHide());
}

export default slice.reducer;