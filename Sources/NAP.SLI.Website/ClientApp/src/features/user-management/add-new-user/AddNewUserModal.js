import React from 'react';
import { Alert, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { actions } from "./reducer";
import AddNewUserForm from "./AddNewUserForm";

const AddNewUserModal = ({ isOpen, groups, isSuccessful, message, toggle, addNewUser, callback }) => {
    const handleSubmit = (values) => addNewUser(values, callback);

    return (
        <Modal isOpen={isOpen} toggle={toggle} unmountOnClose={true}>
            <ModalHeader toggle={toggle}>Add New User</ModalHeader>
            <ModalBody>
                {message &&
                    <Alert className={"text-center"} color={isSuccessful ? 'success' : 'danger'} role="alert">
                        {message}
                    </Alert>
                }
                <AddNewUserForm onSubmit={handleSubmit} groups={groups} />
            </ModalBody>
        </Modal>
    );
};

AddNewUserModal.propTypes = {
    groups: PropTypes.array,
    isOpen: PropTypes.bool.isRequired,
    isSuccessful: PropTypes.bool,
    message: PropTypes.string,
    toggle: PropTypes.func.isRequired,
    addNewUser: PropTypes.func.isRequired,
    callback: PropTypes.func.isRequired
};

const connectedAddNewUserModal = connect(
    state => state.addNewUser,
    dispatch => bindActionCreators(actions, dispatch)
)(AddNewUserModal);

export { connectedAddNewUserModal as AddNewUserModal };