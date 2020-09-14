import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Label, Form, Input, Button, FormGroup, Table } from 'reactstrap';
import Icon from '@mdi/react';
import { mdiAccountPlus, mdiLockReset } from '@mdi/js';
import Select from 'react-select';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from './reducer';
import './UserManagementPage.scss';
import { AddNewUserModal } from './add-new-user/AddNewUserModal';
import { AddExistUserModal } from './add-exist-user/AddExistUserModal';
import { EditUserModal } from './edit-user/EditUserModal';
import { ResetUserPasswordModal } from './reset-user-password/ResetUserPasswordModal';
import { actions as resetPasswordActions } from './reset-user-password/reducer';
import { actions as addNewUserActions } from './add-new-user/reducer';
import { actions as addExistUserActions } from './add-exist-user/reducer';
import { actions as editUserInfoActions } from './edit-user/reducer';

const groupOptions = [
  { value: null, label: 'All Groups' },
  { value: 0, label: 'User' },
  { value: 1, label: 'Admin' }
];

const UserManagementPage = ({ users, query, onUserStatusChange, openResetUserPasswordModal, openAddNewUserModal, openAddExistUserModal, openEditUserModal }) => {
  const [username, setUsername] = useState('');
  const [groupOption, setGroupOption] = useState(groupOptions[0]);

  const handleSubmit = event => {
    event.preventDefault();
    const data = {
      username,
      groupId: groupOption.value
    };
    query(data);
  };

  return (
    <div className="user-management-page">
      <div className="page-title">User Management</div>
      <Form inline className="mb-2">
        <FormGroup className="mr-2">
          <Button type="button" className="btn-block" onClick={() => openAddNewUserModal(groupOptions)}>
            <Icon path={mdiAccountPlus} size={1} /> Add New User
          </Button>
        </FormGroup>
        <FormGroup>
          <Button type="button" className="btn-block" onClick={() => openAddExistUserModal(groupOptions)}>
            <Icon path={mdiAccountPlus} size={1} /> Add Existing User
          </Button>
        </FormGroup>
      </Form>
      <Form inline className="mb-2" onSubmit={handleSubmit} noValidate>
        <FormGroup className="mr-5">
          <Label for="username" className="mr-2">Username</Label>
          <Input id="username" type="text" maxLength="50" value={username} onChange={event => setUsername(event.target.value)} />
        </FormGroup>
        <FormGroup className="mr-5">
          <Select className="group-select" options={groupOptions} value={groupOption} onChange={setGroupOption} isSearchable={false} />
        </FormGroup>
        <FormGroup>
          <Button type="submit" color="primary" className="btn-block">Search</Button>
        </FormGroup>
      </Form>
      <Table hover bordered striped>
        <thead>
          <tr>
            <th>USER NAME</th>
            <th>FIRST NAME</th>
            <th>LAST NAME</th>
            <th>GROUP NAME</th>
            <th>CREATOR</th>
            <th>CREATED DATE</th>
            <th>ACTIVE</th>
            <th>PASSWORD</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={`Row_${user.custId}`}>
              <td onClick={() => openEditUserModal(user)}>{user.userName}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.groupId}</td>
              <td>{user.creator}</td>
              <td>{user.createdDate}</td>
              <td><Input type="checkbox" checked={!user.closed} onChange={e => onUserStatusChange(e.target.checked, user)} value="true" /></td>
              <td><Icon path={mdiLockReset} size={1} onClick={() => openResetUserPasswordModal(user)} /></td>
            </tr>
          )}
        </tbody>
      </Table>
      <AddNewUserModal />
      <AddExistUserModal />
      <EditUserModal />
      <ResetUserPasswordModal />
    </div>
  );
};

UserManagementPage.propTypes = {
  users: PropTypes.array.isRequired,
  query: PropTypes.func.isRequired,
  onUserStatusChange: PropTypes.func.isRequired,
  openResetUserPasswordModal: PropTypes.func.isRequired,
  openAddNewUserModal: PropTypes.func.isRequired,
  openAddExistUserModal: PropTypes.func.isRequired,
  openEditUserModal: PropTypes.func.isRequired
}

const connectedUserManagementPage = connect(
  state => state.userManagement,
  dispatch => bindActionCreators(
    Object.assign({},
      actions,
      {
        openResetUserPasswordModal: resetPasswordActions.open,
        openAddNewUserModal: addNewUserActions.openAddNewUserModal,
        openAddExistUserModal: addExistUserActions.openAddExistUserModal,
        openEditUserModal: editUserInfoActions.openEditUserModal
      }),
    dispatch)
)(UserManagementPage);

export { connectedUserManagementPage as UserManagementPage };
