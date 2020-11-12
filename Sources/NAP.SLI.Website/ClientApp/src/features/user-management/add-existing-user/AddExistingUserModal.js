import React from 'react';
import { Modal, ModalHeader, ModalBody, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { actions } from "./reducer";
import AddExistingUserForm from "./AddExistingUserForm";

const AddExistingUserModal = ({ isOpen, isSuccessful, message, toggle, addExistingUser, callback }) => {
    const handleSubmit = (values) => addExistingUser(values, callback);
    return (
        <Modal isOpen={isOpen} toggle={toggle} unmountOnClose={true}>
            <ModalHeader toggle={toggle}>Add Existing User</ModalHeader>
            <ModalBody>
                {message &&
                    <Alert className={"text-center"} color={isSuccessful ? 'success' : 'danger'} role="alert">
                        {message}
                    </Alert>
                }
                <AddExistingUserForm onSubmit={handleSubmit} />
            </ModalBody>
        </Modal>
    );
};

AddExistingUserModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    isSuccessful: PropTypes.bool,
    message: PropTypes.string,
    toggle: PropTypes.func.isRequired,
    addExistingUser: PropTypes.func.isRequired,
    callback: PropTypes.func
};

const connectedAddExistingUserModal = connect(
    state => state.addExistingUser,
    dispatch => bindActionCreators(actions, dispatch)
)(AddExistingUserModal);

export { connectedAddExistingUserModal as AddExistingUserModal };