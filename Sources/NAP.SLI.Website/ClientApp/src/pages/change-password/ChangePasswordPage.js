import React, { useState } from 'react';
import { Form, Label, Input, Button, FormGroup } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { accountActions } from '../../reducers/Account';
import './ChangePasswordPage.scss';

const ChangePasswordPage = ({ changePassword, toggleChangePasswordModal, message }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [_message, setMessage] = useState(message);

  const handleSubmit = event => {
    event.preventDefault();
    setMessage('');
    if (confirmPassword !== newPassword) {
      setMessage('New password and confirm password does not match');
      return;
    }

    changePassword(oldPassword, newPassword);
  };

  return (
    <Form className="change-password-page" noValidate onSubmit={handleSubmit}>
      {_message && <div className="text-center alert alert-danger" role="alert">
        {_message}
      </div>}
      <FormGroup>
        <Label for="oldPassword" className="col-form-label">Old Password</Label>
        <Input type="password" id="oldPassword" value={oldPassword} onChange={event => setOldPassword(event.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label for="newPassword" className="col-form-label">New Password</Label>
        <Input type="password" id="newPassword" value={newPassword} onChange={event => setNewPassword(event.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label for="confirmPassword" className="col-form-label">Confirm Password</Label>
        <Input type="password" id="confirmPassword" value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label className="col-form-label"></Label>
        <Button type="submit" color="primary" className="mr-1">Submit</Button>
        <Button type="button" color="secondary" onClick={toggleChangePasswordModal}>Cancel</Button>
      </FormGroup>
    </Form>
  );
};

ChangePasswordPage.propTypes = {
  changePassword: PropTypes.func.isRequired,
  toggleChangePasswordModal: PropTypes.func.isRequired,
  message: PropTypes.string
};

const connectedChangePasswordPage = connect(
  state => state,
  dispatch => bindActionCreators(Object.assign({}, accountActions), dispatch)
)(ChangePasswordPage);

export { connectedChangePasswordPage as ChangePasswordPage };