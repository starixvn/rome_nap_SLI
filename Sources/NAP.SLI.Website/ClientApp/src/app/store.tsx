import {
  configureStore,
  Reducer,
  CombinedState,
  Action,
} from '@reduxjs/toolkit';
import { logout } from 'features/account/authentication/reducer';
import appReducer, { AppState } from './reducer';
import { useDispatch } from 'react-redux';

const reducer: Reducer<CombinedState<AppState>, Action> = (state, action) => {
  if (action.type === logout.type) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

const store = configureStore({
  reducer,
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
