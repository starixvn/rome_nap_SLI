import { createSlice } from '@reduxjs/toolkit';

const defaultProps = {
  title: '',
  message: '',
  okText: 'OK',
  cancelText: 'Cancel'
};

const slice = createSlice({
  name: 'confirmation',
  initialState: {
    isOpen: false,
    props: defaultProps
  },
  reducers: {
    show: (state, action) => {
      state.isOpen = true;
      state.props = action.payload.props;
    },
    hide: (state) => {
      state.isOpen = false;
    }
  }
});

export const { show, hide } = slice.actions;
const defaultOnConfirm = () => { };
const defaultOnCancel = () => { };
let _onConfirm = defaultOnConfirm;
let _onCancel = defaultOnCancel;
export const confirm = (props: any, onConfirm: any, onCancel: any) => (dispatch: AppDispatch) => {
  _onConfirm = onConfirm || defaultOnConfirm;
  _onCancel = onCancel || defaultOnCancel;
  dispatch(show({ props }));
};

export const confirmed = (isOk: boolean) => (dispatch: AppDispatch) => {
  dispatch(hide());
  isOk ? _onConfirm() : _onCancel();
}

export default slice.reducer;