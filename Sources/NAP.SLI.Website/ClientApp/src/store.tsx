import { configureStore, getDefaultMiddleware, combineReducers, Reducer, CombinedState, Action } from '@reduxjs/toolkit';
import confirmationReducer from './common/components/confirmation/reducer';
import toastReducer from './common/components/toast/reducer';
import sidebarReducer from './features/sidebar/reducer';
import authenticationReducer from './features/account/authentication/reducer';
import changePasswordReducer from './features/account/change-password/reducer';
import userManagementReducer from './features/user-management/reducer';
import addNewUserReducer from './features/user-management/add-new-user/reducer';
import addExistingUserReducer from './features/user-management/add-existing-user/reducer';
import editUserReducer from './features/user-management/edit-user/reducer';
import resetUserPasswordReducer from './features/user-management/reset-user-password/reducer';
import winLossDetailReducer from './features/reports/win-loss-detail/reducer';
import winLossAnalysisReducer from './features/reports/win-loss-analysis/reducer';
import umReducer from './features/error/UM/reducer';
import { logoutSuccess } from './features/account/authentication/reducer';

const middleware = [
  ...getDefaultMiddleware(),
  /*YOUR CUSTOM MIDDLEWARES HERE*/
];

const appReducer = combineReducers({
  confirmation: confirmationReducer,
  toast: toastReducer,
  sidebar: sidebarReducer,
  authentication: authenticationReducer,
  changePassword: changePasswordReducer,
  userManagement: userManagementReducer,
  addNewUser: addNewUserReducer,
  addExistingUser: addExistingUserReducer,
  editUser: editUserReducer,
  resetUserPassword: resetUserPasswordReducer,
  winLossDetail: winLossDetailReducer,
  winLossAnalysis: winLossAnalysisReducer,
  um: umReducer
});

const rootReducer: Reducer<CombinedState<any>, Action> = (state, action) => {
  if (action.type === logoutSuccess.type) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action)
};

const store = configureStore({
  reducer: rootReducer,
  middleware
});

export type RootState = ReturnType<typeof appReducer> & { custId: number, roleId: number, username: string };
export type AppDispatch = typeof store.dispatch;

export default store;
