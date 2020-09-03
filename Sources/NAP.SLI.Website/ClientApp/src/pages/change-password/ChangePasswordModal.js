import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { accountActions } from '../../reducers/Account';
import { ChangePasswordPage } from './ChangePasswordPage';

const ChangePasswordModal = ({ authentication, account, toggleChangePasswordModal }) => {
  const { username } = authentication.user;
  const { isChangePasswordOpen } = account;

  return (
    <Modal isOpen={isChangePasswordOpen} toggle={toggleChangePasswordModal}>
      <ModalHeader toggle={toggleChangePasswordModal}>{username} / Change Password</ModalHeader>
      <ModalBody>
        <ChangePasswordPage />
      </ModalBody>
    </Modal>
  );
};

ChangePasswordModal.propTypes = {
  authentication: PropTypes.object.isRequired,
  account: PropTypes.object.isRequired,
  toggleChangePasswordModal: PropTypes.func.isRequired
};

const connectedChangePasswordModal = connect(
  state => state,
  dispatch => bindActionCreators(accountActions, dispatch)
)(ChangePasswordModal);

export { connectedChangePasswordModal as ChangePasswordModal };