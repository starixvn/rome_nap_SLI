import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, FormGroup } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userActions } from '../../reducers/User';

const UserManagementPage = ({ query }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    const payload = {
      username
    };
    query(payload);
  };

  return (
    <Form className="user-management-page" onSubmit={handleSubmit} noValidate>
      <FormGroup>
        <Input type="text" placeholder="Username" maxLength="50" value={username} onChange={event => setUsername(event.target.value)} />
      </FormGroup>
      <FormGroup>
        <Button type="submit" color="primary" className="btn-block">Search</Button>
      </FormGroup>
    </Form>
  );
};

UserManagementPage.propTypes = {
  query: PropTypes.func.isRequired
}

const connectedUserManagementPage = connect(
  state => state.user,
  dispatch => bindActionCreators(userActions, dispatch)
)(UserManagementPage);

export { connectedUserManagementPage as UserManagementPage };
