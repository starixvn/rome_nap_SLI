import {
  configureStore,
  Reducer,
  CombinedState,
  Action,
  ThunkAction,
} from '@reduxjs/toolkit';
import { logout } from 'features/account/authentication/reducer';
import appReducer, { AppState } from './reducer';
import { useDispatch } from 'react-redux';
import { createReduxEnhancer } from '@sentry/react';

const reducer: Reducer<CombinedState<AppState>, Action> = (state, action) => {
  if (action.type === logout.fulfilled.type) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

const sentryReduxEnhancer = createReduxEnhancer({
  actionTransformer: (action) => {
    return {
      ...action,
      password: undefined,
      oldPassword: undefined,
      newPassword: undefined,
      confirmPassword: undefined,
    };
  },
});

const store = configureStore({
  reducer,
  enhancers: [sentryReduxEnhancer],
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
