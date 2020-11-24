import './Page.scss';
import React, { useState } from 'react';
import { Form, Label, Input, Button, FormGroup } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toggleChangePasswordModal, showError, changePassword } from './reducer';

const ChangePasswordPage = () => {
  const dispatch = useDispatch();
  const { isSuccess, message } = useSelector(state => state.changePassword);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    if (confirmPassword !== newPassword) {
      dispatch(showError('New password and confirm password does not match'));
      return;
    }

    dispatch(changePassword(oldPassword, newPassword));
  };

  return (
    <Form className="change-password-page" noValidate onSubmit={handleSubmit}>
      {message &&
        <div className={`text-center alert ${isSuccess ? 'alert-success' : 'alert-danger'}`} role="alert">
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
      <FormGroup className="mt-5">
        <Label className="col-form-label"></Label>
        <Button type="submit" color="primary" className="mr-2">Submit</Button>
        <Button type="button" color="secondary" onClick={() => dispatch(toggleChangePasswordModal())}>Cancel</Button>
      </FormGroup>
    </Form>
  );
};

export default ChangePasswordPage;