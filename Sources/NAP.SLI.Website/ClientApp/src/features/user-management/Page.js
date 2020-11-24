import './Page.scss';
import React, { useState } from 'react';
import { Label, Form, Input, Button, FormGroup, Table, Container } from 'reactstrap';
import Icon from '@mdi/react';
import { mdiAccountPlus, mdiLockReset } from '@mdi/js';
import { useSelector, useDispatch } from 'react-redux';
import { query } from './reducer';
import AddNewUserModal from './add-new-user/Modal';
import { toggleModal as toggleAddNewUserModel } from './add-new-user/reducer';
import AddExistingUserModal from './add-existing-user/Modal';
import { toggleModal as toggleAddExistingUserModel } from './add-existing-user/reducer';
import EditUserModal from './edit-user/Modal';
import { toggleModal as toggleEditUserModal } from './edit-user/reducer';
import ResetUserPasswordModal from './reset-user-password/Modal';
import { toggleModal as toggleResetUserPasswordModal } from './reset-user-password/reducer';
import { UserGroupSelectOptionsWithAll, getGroupName } from '../../common/models/UserGroup';

const UserManagementPage = () => {
  const dispatch = useDispatch();
  const { users } = useSelector(state => state.userManagement);
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

  const handleSubmit = event => {
    event.preventDefault();
    const data = {
      username,
      groupId
    };
    dispatch(query(data));
  };

  const handleSelectChange = (event) => {
    const groupId = parseInt(event.target.value);
    setGroupId(isNaN(groupId) ? undefined : groupId);
  };

  const renderTableBody = () => {
    if (users.length === 0) {
      return (
        <tr>
          <td className="text-center" colSpan={8}>
            There is no information
          </td>
        </tr>
      );
    }

    return (
      <>
        {users.map(user =>
          <tr key={`Row_${user.custId}`}>
            <td>
              <span className="text-link" onClick={() => dispatch(toggleEditUserModal({ user }))}>{user.userName}</span>
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
              <Input type="checkbox" checked={!user.closed} onChange={e => handleStatusClick(e.target.checked, user)} />
            </td>
            <td className="text-center">
              <Icon className="cursor-pointer" path={mdiLockReset} onClick={() => dispatch(toggleResetUserPasswordModal({ user }))} />
            </td>
          </tr>
        )}
      </>
    );
  };

  return (
    <div className="user-management-page">
      <div className="page-title">User Management</div>
      <Container fluid className="filter">
        <Form inline className="mb-3">
          <FormGroup className="mr-2">
            <Button type="button" className="btn-block" onClick={() => dispatch(toggleAddNewUserModel())}>
              <Icon path={mdiAccountPlus} /> Add New User
          </Button>
          </FormGroup>
          <FormGroup>
            <Button type="button" className="btn-block" onClick={() => dispatch(toggleAddExistingUserModel())}>
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
      </Container>
      {users && <Table hover bordered striped>
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
          {renderTableBody()}
        </tbody>
      </Table>}
      <AddNewUserModal />
      <AddExistingUserModal />
      <EditUserModal />
      <ResetUserPasswordModal />
    </div>
  );
};

export default UserManagementPage;
