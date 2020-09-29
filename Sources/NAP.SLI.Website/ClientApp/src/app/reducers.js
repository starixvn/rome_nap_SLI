import { combineReducers } from 'redux';
import * as SideBar from '../common/components/sidebar/reducer';
import * as Customer from '../features/customer/CustomerReducer';
import * as Authentication from '../features/account/authentication/reducer';
import * as ChangePassword from '../features/account/change-password/reducer';
import * as UserManagement from '../features/user-management/reducer';
import * as ResetUserPassword from '../features/user-management/reset-user-password/reducer';
import * as AddNewUser from '../features/user-management/add-new-user/reducer';
import * as AddExistUser from '../features/user-management/add-exist-user/reducer';
import * as EditUser from '../features/user-management/edit-user/reducer';
import * as ConfirmBox from '../common/components/confirm-box/reducer';
import { reducer as formReducer } from 'redux-form'

const createRootReducer = () => combineReducers({
  sideBar: SideBar.reducer,
  customer: Customer.reducer,
  authentication: Authentication.reducer,
  changePassword: ChangePassword.reducer,
  userManagement: UserManagement.reducer,
  resetUserPassword: ResetUserPassword.reducer,
  addNewUser: AddNewUser.reducer,
  addExistUser: AddExistUser.reducer,
  editUser: EditUser.reducer,
  confirmBox: ConfirmBox.reducer,
  form: formReducer
})

export default createRootReducer;