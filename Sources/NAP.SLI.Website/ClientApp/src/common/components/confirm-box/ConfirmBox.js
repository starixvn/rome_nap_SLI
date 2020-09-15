import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { actions } from "./reducer";

const ConfirmBox = ({ isOpen, title, message, submitText, cancelText, closeConfirmBox, callback }) => {
    const handleConfirm = () => {
        closeConfirmBox();
        callback();
    }

    return (
        <Modal isOpen={isOpen} toggle={closeConfirmBox} unmountOnClose={true}>
            <ModalHeader toggle={closeConfirmBox}>{title}</ModalHeader>
            <ModalBody>
                {message}
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleConfirm}>{submitText}</Button>
                <Button color="secondary" onClick={closeConfirmBox}>{cancelText}</Button>
            </ModalFooter>
        </Modal>
    );
};

ConfirmBox.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string,
    submitText: PropTypes.string,
    cancelText: PropTypes.string,
    closeConfirmBox: PropTypes.func.isRequired,
    callback: PropTypes.func.isRequired
};

const connectedConfirmBox = connect(
    state => state.confirmBox,
    dispatch => bindActionCreators(actions, dispatch)
)(ConfirmBox);

export { connectedConfirmBox as ConfirmBox };