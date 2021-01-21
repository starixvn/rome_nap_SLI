import {
  configureStore,
  Reducer,
  CombinedState,
  Action,
} from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { logoutSuccess } from 'features/account/authentication/reducer';
import appReducer, { AppState } from './reducer';

const reducer: Reducer<CombinedState<AppState>, Action> = (state, action) => {
  if (action.type === logoutSuccess.type) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

const store = configureStore({
  reducer,
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, AppState, unknown, Action<string>>;

export default store;
