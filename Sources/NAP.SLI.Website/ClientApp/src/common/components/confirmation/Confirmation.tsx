import { useSelector, useDispatch } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { confirmed } from './reducer';

const Confirmation: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpen, title, message } = useSelector((state: RootState) => state.confirmation);

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