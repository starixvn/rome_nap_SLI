import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { passwordActions } from '../../reducers/Password';
import { ChangePasswordPage } from './ChangePasswordPage';

const ChangePasswordModal = ({ authentication, password, toggleModal }) => {
  const { username } = authentication.user;
  const { isOpen } = password;

  return (
    <Modal isOpen={isOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>{username} / Change Password</ModalHeader>
      <ModalBody>
        <ChangePasswordPage />
      </ModalBody>
    </Modal>
  );
};

ChangePasswordModal.propTypes = {
  authentication: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired,
  toggleModal: PropTypes.func.isRequired
};

const connectedChangePasswordModal = connect(
  state => state,
  dispatch => bindActionCreators(passwordActions, dispatch)
)(ChangePasswordModal);

export { connectedChangePasswordModal as ChangePasswordModal };