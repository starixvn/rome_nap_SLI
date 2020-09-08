import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { actions } from './reducer';
import { ChangePasswordPage } from './ChangePasswordPage';

const ChangePasswordModal = ({ username, isOpen, toggle }) => {

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{username} / Change Password</ModalHeader>
      <ModalBody>
        <ChangePasswordPage />
      </ModalBody>
    </Modal>
  );
};

ChangePasswordModal.propTypes = {
  username: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
};

const connectedChangePasswordModal = connect(
  state => Object.assign({}, state.authentication.account, state.changePassword),
  dispatch => bindActionCreators(actions, dispatch)
)(ChangePasswordModal);

export { connectedChangePasswordModal as ChangePasswordModal };