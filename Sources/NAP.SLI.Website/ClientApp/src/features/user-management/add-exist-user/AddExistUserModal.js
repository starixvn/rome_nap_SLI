import React from 'react';
import { Modal, ModalHeader, ModalBody, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { actions } from "./reducer";
import AddExistUserForm from "./AddExistUserForm";

const AddExistUserModal = ({ isOpen, groups, isSuccessful, message, toggle, addExistUser, callback }) => {
    const handleSubmit = (values) => addExistUser(values, callback);
    return (
        <Modal isOpen={isOpen} toggle={toggle} unmountOnClose={true}>
            <ModalHeader toggle={toggle}>Add Exist User</ModalHeader>
            <ModalBody>
                {message &&
                    <Alert className={"text-center"} color={isSuccessful ? 'success' : 'danger'} role="alert">
                        {message}
                    </Alert>
                }
                <AddExistUserForm onSubmit={handleSubmit} groups={groups} />
            </ModalBody>
        </Modal>
    );
};

AddExistUserModal.propTypes = {
    groups: PropTypes.array,
    isOpen: PropTypes.bool.isRequired,
    isSuccessful: PropTypes.bool,
    message: PropTypes.string,
    toggle: PropTypes.func.isRequired,
    addExistUser: PropTypes.func.isRequired,
    callback: PropTypes.func.isRequired
};

const connectedAddExistUserModal = connect(
    state => state.addExistUser,
    dispatch => bindActionCreators(actions, dispatch)
)(AddExistUserModal);

export { connectedAddExistUserModal as AddExistUserModal };