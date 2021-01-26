import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

type Props = {
  title: string;
  message: string;
  onConfirm: Func;
  onCancel: Func;
};

const Confirmation = ({ title, message, onConfirm, onCancel }: Props) => {
  return (
    <Modal isOpen unmountOnClose>
      <ModalHeader toggle={() => onConfirm()}>{title}</ModalHeader>
      <ModalBody>{message}</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => onConfirm()}>
          OK
        </Button>
        <Button color="secondary" onClick={() => onCancel()}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Confirmation;
