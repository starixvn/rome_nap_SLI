import { combineReducers } from 'redux';
import * as SideBar from '../common/components/sidebar/reducer';
import * as Authentication from '../features/account/authentication/reducer';
import * as ChangePassword from '../features/account/change-password/reducer';
import * as UserManagement from '../features/user-management/reducer';
import * as ResetUserPassword from '../features/user-management/reset-user-password/reducer';
import { reducer as formReducer } from 'redux-form'

const createRootReducer = () => combineReducers({
  sideBar: SideBar.reducer,
  authentication: Authentication.reducer,
  changePassword: ChangePassword.reducer,
  userManagement: UserManagement.reducer,
  resetUserPassword: ResetUserPassword.reducer,
  form: formReducer
})

export default createRootReducer;