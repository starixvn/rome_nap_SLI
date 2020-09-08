import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Label, Form, Input, Button, FormGroup, Table } from 'reactstrap';
import Icon from '@mdi/react';
import { mdiAccountPlus, mdiLockReset } from '@mdi/js';
import Select from 'react-select';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userActions } from '../../reducers/User';
import './UserManagementPage.scss';

const groupOptions = [
  { value: null, label: 'All Groups' },
  { value: 0, label: 'User' },
  { value: 1, label: 'Admin' }
];

const UserManagementPage = ({ users, query, onUserStatusChange }) => {
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

  const addNewUser = () => {
  }

  const addExistingUser = () => {
  }

  return (
    <div className="user-management-page">
      <h4>User Management</h4>
      <Form inline className="mb-2">
        <FormGroup className="mr-2">
          <Button type="button" className="btn-block" onClick={addNewUser}>
            <Icon path={mdiAccountPlus} size={1} /> Add New User
          </Button>
        </FormGroup>
        <FormGroup>
          <Button type="button" className="btn-block" onClick={addExistingUser}>
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
              <td>{user.userName}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.groupId}</td>
              <td>{user.creator}</td>
              <td>{user.createdDate}</td>
              <td><Input type="checkbox" checked={!user.closed} onChange={e => onUserStatusChange(e.target.checked, user)} value="true" /></td>
              <td><Icon path={mdiLockReset} size={1} /></td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

UserManagementPage.propTypes = {
  users: PropTypes.array.isRequired,
  query: PropTypes.func.isRequired,
  onUserStatusChange: PropTypes.func.isRequired
}

const connectedUserManagementPage = connect(
  state => state.user,
  dispatch => bindActionCreators(Object.assign({}, userActions), dispatch)
)(UserManagementPage);

export { connectedUserManagementPage as UserManagementPage };
