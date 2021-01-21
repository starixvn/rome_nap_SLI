import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { noop } from 'utils/FunctionUtils';

type State = {
  isOpen: boolean;
  title: string;
  message: string;
};

type ConfirmProps = {
  title: string;
  message: string;
};

const initialState: State = {
  isOpen: false,
  title: '',
  message: '',
};

const slice = createSlice({
  name: 'confirmation',
  initialState,
  reducers: {
    show: (state, action: PayloadAction<ConfirmProps>) => {
      const { title, message } = action.payload;
      state.isOpen = true;
      state.title = title;
      state.message = message;
    },
    hide: (state) => {
      state.isOpen = false;
    },
  },
});

export const { show, hide } = slice.actions;

const defaultOnConfirm: Func = noop;
const defaultOnCancel: Func = noop;
let _onConfirm = defaultOnConfirm;
let _onCancel = defaultOnCancel;

export const confirm = (
  data: ConfirmProps,
  onConfirm?: Func,
  onCancel?: Func,
) => (dispatch: AppDispatch) => {
  _onConfirm = onConfirm || defaultOnConfirm;
  _onCancel = onCancel || defaultOnCancel;
  dispatch(show({ ...data }));
};

export const confirmed = (isOk: boolean) => (dispatch: AppDispatch) => {
  dispatch(hide());
  isOk ? _onConfirm() : _onCancel();
};

export default slice.reducer;
