import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Label, Form, Input, Button, FormGroup, Table } from 'reactstrap';
import Icon from '@mdi/react';
import { mdiAccountPlus, mdiLockReset } from '@mdi/js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from './reducer';
import './UserManagementPage.scss';
import { AddNewUserModal } from './add-new-user/AddNewUserModal';
import { AddExistingUserModal } from './add-existing-user/AddExistingUserModal';
import { EditUserModal } from './edit-user/EditUserModal';
import { ResetUserPasswordModal } from './reset-user-password/ResetUserPasswordModal';
import { actions as resetPasswordActions } from './reset-user-password/reducer';
import { actions as addNewUserActions } from './add-new-user/reducer';
import { actions as addExistingUserActions } from './add-existing-user/reducer';
import { actions as editUserInfoActions } from './edit-user/reducer';
import { actions as confirmBox } from '../../common/components/confirm-box/reducer';
import { UserGroupSelectOptionsWithAll, getGroupName } from '../../common/models/UserGroup';

const UserManagementPage = ({ users, query, message, isSuccessful, changeUserStatus, openResetUserPasswordModal, openAddNewUserModal, openAddExistingUserModal, openEditUserModal, openConfirmBox }) => {
  const [username, setUsername] = useState('');
  const [groupId, setGroupId] = useState(UserGroupSelectOptionsWithAll[0].value);

  const handleStatusClick = (checked, user) => {
    const data = {
      username,
      groupId
    };
    var updateCallback = () => {
      changeUserStatus(checked, user);
      setTimeout(() => {
        query(data);
      }, 3000);
    };
    var title = checked ? "Activate User" : "Deactivate User";
    var message = `Are you sure to ${checked ? 'activate' : 'deactivate'} [${user.userName}] user?`;
    openConfirmBox(title, message, updateCallback);
  };

  const queryCallback = () => {
    const data = {
      username,
      groupId
    };
    query(data);
  };

  const handleSubmit = event => {
    event.preventDefault();
    queryCallback();
  };

  const handleSelectChange = event => {
    const groupId = parseInt(event.target.value);
    setGroupId(isNaN(groupId) ? undefined : groupId);
  };

  return (
    <div className="user-management-page">
      <div className="page-title">User Management</div>
      <Form inline className="mb-3">
        <FormGroup className="mr-2">
          <Button type="button" className="btn-block" onClick={() => openAddNewUserModal(queryCallback)}>
            <Icon path={mdiAccountPlus} /> Add New User
          </Button>
        </FormGroup>
        <FormGroup>
          <Button type="button" className="btn-block" onClick={() => openAddExistingUserModal(queryCallback)}>
            <Icon path={mdiAccountPlus} /> Add Existing User
          </Button>
        </FormGroup>
      </Form>
      <Form inline className="mb-3" onSubmit={handleSubmit} noValidate>
        <FormGroup className="mr-5">
          <Label for="username" className="mr-2">Username</Label>
          <Input id="username" type="text" maxLength="50" value={username} onChange={event => setUsername(event.target.value)} />
        </FormGroup>
        <FormGroup className="mr-5">
          <Input type="select" value={groupId} onChange={(event) => handleSelectChange(event)}>
            {UserGroupSelectOptionsWithAll.map((option, index) =>
              <option key={index} value={option.value}>{option.label}</option>
            )}
          </Input>
        </FormGroup>
        <FormGroup>
          <Button type="submit" color="primary" className="btn-block">Search</Button>
        </FormGroup>
      </Form>
      {message &&
        <Alert className={"text-center"} color={isSuccessful ? 'success' : 'danger'} role="alert">
          {message}
        </Alert>
      }
      <Table hover bordered striped>
        <thead>
          <tr>
            <th className="text-center">USER NAME</th>
            <th className="text-center">FIRST NAME</th>
            <th className="text-center">LAST NAME</th>
            <th className="text-center">GROUP NAME</th>
            <th className="text-center">CREATOR</th>
            <th className="text-center">CREATED DATE</th>
            <th className="text-center">ACTIVE</th>
            <th className="text-center">PASSWORD</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={`Row_${user.custId}`}>
              <td>
                <span className="text-link" onClick={() => openEditUserModal(user, queryCallback)}>{user.userName}</span>
              </td>
              <td>
                {user.firstName}
              </td>
              <td>
                {user.lastName}
              </td>
              <td>
                {getGroupName(user.groupId)}
              </td>
              <td>
                {user.creator}
              </td>
              <td className="text-center">
                {user.createdDate}
              </td>
              <td className="text-center">
                <Input type="checkbox" checked={!user.closed} onChange={e => handleStatusClick(e.target.checked, user)} value="true" />
              </td>
              <td className="text-center">
                <Icon className="cursor-pointer" path={mdiLockReset} onClick={() => openResetUserPasswordModal(user, queryCallback)} />
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <AddNewUserModal />
      <AddExistingUserModal />
      <EditUserModal />
      <ResetUserPasswordModal />
    </div>
  );
};

UserManagementPage.propTypes = {
  users: PropTypes.array.isRequired,
  query: PropTypes.func.isRequired,
  message: PropTypes.string,
  isSuccessful: PropTypes.bool,
  changeUserStatus: PropTypes.func.isRequired,
  openResetUserPasswordModal: PropTypes.func.isRequired,
  openAddNewUserModal: PropTypes.func.isRequired,
  openAddExistingUserModal: PropTypes.func.isRequired,
  openEditUserModal: PropTypes.func.isRequired,
  openConfirmBox: PropTypes.func.isRequired
}

const connectedUserManagementPage = connect(
  state => state.userManagement,
  dispatch => bindActionCreators(
    Object.assign({},
      actions,
      {
        openResetUserPasswordModal: resetPasswordActions.open,
        openAddNewUserModal: addNewUserActions.openAddNewUserModal,
        openAddExistingUserModal: addExistingUserActions.openAddExistingUserModal,
        openEditUserModal: editUserInfoActions.openEditUserModal,
        openConfirmBox: confirmBox.openConfirmBox
      }),
    dispatch)
)(UserManagementPage);

export { connectedUserManagementPage as UserManagementPage };
