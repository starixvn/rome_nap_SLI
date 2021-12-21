import {
  configureStore,
  Reducer,
  CombinedState,
  Action,
  ThunkAction,
  Middleware,
  isRejected,
} from '@reduxjs/toolkit';
import { logout } from 'features/account/authentication/reducer';
import appReducer, { AppState } from './reducer';
import { useDispatch } from 'react-redux';
import { captureException, createReduxEnhancer } from '@sentry/react';
import { error as toastError } from 'components/toast/reducer';

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

const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejected(action)) {
    const error = action.error;
    if (error && error.name && error.message && error.stack) {
      const e = new Error(error.message);
      e.stack = error.stack;
      store.dispatch(toastError('Something went wrong'));
      captureException(e);
    }
  }

  return next(action);
};

const store = configureStore({
  reducer,
  enhancers: [sentryReduxEnhancer],
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([rtkQueryErrorLogger]),
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
