import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toggleChangePasswordModal } from './reducer';
import ChangePasswordPage from './Page';

const ChangePasswordModal = () => {
  const dispatch = useDispatch();
  const { username } = useSelector(state => state.authentication.account);
  const { isOpen } = useSelector(state => state.changePassword);

  const toggleModal = () => {
    dispatch(toggleChangePasswordModal());
  };

  return (
    <Modal isOpen={isOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>{username} / Change Password</ModalHeader>
      <ModalBody>
        <ChangePasswordPage />
      </ModalBody>
    </Modal>
  );
};


export default ChangePasswordModal;