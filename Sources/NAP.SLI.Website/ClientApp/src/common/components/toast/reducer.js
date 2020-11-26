import { createSlice } from '@reduxjs/toolkit';

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

let timeout;
const autoHide = () => (dispatch) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => dispatch(hide()), 3000);
}

export const success = (message) => (dispatch) => {
  dispatch(show({ message, color: 'success' }));
  dispatch(autoHide());
}

export const info = (message) => (dispatch) => {
  dispatch(show({ message, color: 'info' }));
  dispatch(autoHide());
}

export const error = (message) => (dispatch) => {
  dispatch(show({ message, color: 'danger' }));
  dispatch(autoHide());
}

export default slice.reducer;