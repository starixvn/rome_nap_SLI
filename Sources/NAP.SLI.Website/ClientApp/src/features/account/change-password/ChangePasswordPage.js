import React, { useState } from 'react';
import { Form, Label, Input, Button, FormGroup } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { actions } from './reducer';
import './ChangePasswordPage.scss';

const ChangePasswordPage = ({ changePassword, toggle, showError, message, isSuccessful }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    if (confirmPassword !== newPassword) {
      showError('New password and confirm password does not match');
      return;
    }

    changePassword(oldPassword, newPassword);
  };

  return (
    <Form className="change-password-page" noValidate onSubmit={handleSubmit}>
      {message &&
        <div className={`text-center alert ${isSuccessful ? 'alert-success' : 'alert-danger'}`} role="alert">
          {message}
        </div>
      }
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
        <Button type="submit" color="primary" className="mr-2">Submit</Button>
        <Button type="button" color="secondary" onClick={toggle}>Cancel</Button>
      </FormGroup>
    </Form>
  );
};

ChangePasswordPage.propTypes = {
  changePassword: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  showError: PropTypes.func.isRequired,
  isSuccessful: PropTypes.bool,
  message: PropTypes.string
};

const connectedChangePasswordPage = connect(
  state => state.changePassword,
  dispatch => bindActionCreators(actions, dispatch)
)(ChangePasswordPage);

export { connectedChangePasswordPage as ChangePasswordPage };