import { combineReducers } from '@reduxjs/toolkit';
import toastReducer from 'components/toast/reducer';
import sidebarReducer from 'features/sidebar/reducer';
import authenticationReducer from 'features/account/authentication/reducer';
import changePasswordReducer from 'features/account/change-password/reducer';
import userManagementReducer from 'features/user-management/reducer';
import addNewUserReducer from 'features/user-management/add-new-user/reducer';
import addExistingUserReducer from 'features/user-management/add-existing-user/reducer';
import editUserReducer from 'features/user-management/edit-user/reducer';
import resetUserPasswordReducer from 'features/user-management/reset-user-password/reducer';
import winLossDetailReducer from 'features/reports/win-loss-detail/reducer';
import winLossAnalysisReducer from 'features/reports/win-loss-analysis/reducer';
import matchWinLossDetailReducer from 'features/reports/match-win-loss-detail/reducer';
import umReducer from 'features/error/UM/reducer';

const appReducer = combineReducers({
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
  matchWinLossDetail: matchWinLossDetailReducer,
  um: umReducer,
});

export type AppState = ReturnType<typeof appReducer>;

export default appReducer;
