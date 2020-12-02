import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { RootState } from '../../../store';
import { confirmed } from './reducer';

const Confirmation = () => {
  const dispatch = useDispatch();
  const { isOpen, props } = useSelector((state: RootState) => state.confirmation);
  const { title, message } = props;

  const handleConfirm = (isOk: boolean) => {
    dispatch(confirmed(isOk));
  }

  return (
    <Modal isOpen={isOpen} unmountOnClose>
      <ModalHeader toggle={() => handleConfirm(false)}>{title}</ModalHeader>
      <ModalBody>
        {message}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => handleConfirm(true)}>OK</Button>
        <Button color="secondary" onClick={() => handleConfirm(false)}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default Confirmation;