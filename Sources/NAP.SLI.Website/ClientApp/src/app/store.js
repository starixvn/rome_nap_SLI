import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import confirmationReducer from '../common/components/confirmation/reducer';
import toastReducer from '../common/components/toast/reducer';
import sidebarReducer from '../features/sidebar/reducer';
import authenticationReducer from '../features/account/authentication/reducer';
import changePasswordReducer from '../features/account/change-password/reducer';
import userManagementReducer from '../features/user-management/reducer';
import addNewUserReducer from '../features/user-management/add-new-user/reducer';
import addExistingUserReducer from '../features/user-management/add-existing-user/reducer';
import editUserReducer from '../features/user-management/edit-user/reducer';
import resetUserPasswordReducer from '../features/user-management/reset-user-password/reducer';

const middleware = [
  ...getDefaultMiddleware(),
  /*YOUR CUSTOM MIDDLEWARES HERE*/
];

const store = configureStore({
  reducer: {
    confirmation: confirmationReducer,
    toast: toastReducer,
    sidebar: sidebarReducer,
    authentication: authenticationReducer,
    changePassword: changePasswordReducer,
    userManagement: userManagementReducer,
    addNewUser: addNewUserReducer,
    addExistingUser: addExistingUserReducer,
    editUser: editUserReducer,
    resetUserPassword: resetUserPasswordReducer
  },
  middleware
});

export default store;
