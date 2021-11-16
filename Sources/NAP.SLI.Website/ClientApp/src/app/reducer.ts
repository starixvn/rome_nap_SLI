import { combineReducers } from '@reduxjs/toolkit';
import toastReducer from 'components/toast/reducer';
import reportFilterReducer from 'components/report-filter/reducer';
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
import winLossByBetTypeReducer from 'features/reports/win-loss-by-bet-type/reducer';
import matchWinLossDetailReducer from 'features/reports/match-win-loss-detail/reducer';
import betListReducer from 'features/reports/bet-list/reducer';
import resultsReducer from 'features/reports/results/reducer';
import umReducer from 'features/error/UM/reducer';
import customerSettingViewSuperReducer from 'features/customer-setting/view-super/reducer';
import customerSettingViewMasterReducer from 'features/customer-setting/view-master/reducer';
import customerSettingViewAgentReducer from 'features/customer-setting/view-agent/reducer';
import customerSettingViewMemberReducer from 'features/customer-setting/view-member/reducer';

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
  winLossByBetType: winLossByBetTypeReducer,
  matchWinLossDetail: matchWinLossDetailReducer,
  betList: betListReducer,
  results: resultsReducer,
  um: umReducer,
  customerSettingViewSuper: customerSettingViewSuperReducer,
  customerSettingViewMaster: customerSettingViewMasterReducer,
  customerSettingViewAgent: customerSettingViewAgentReducer,
  customerSettingViewMember: customerSettingViewMemberReducer,
  reportFilter: reportFilterReducer,
});

export type AppState = ReturnType<typeof appReducer>;

export default appReducer;
