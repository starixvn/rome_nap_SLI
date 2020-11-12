import React from 'react';
import { Alert, Modal, ModalHeader, ModalBody } from 'reactstrap';
import ProTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from './reducer';
import EditUserForm from './EditUserForm';

const EditUserModal = ({ isOpen, user, message, isSuccessful, toggle, updateUser, callback }) => {
    const handleSubmit = (values) => {
        updateUser(values, callback);
    };

    const userInfor = {
        custId: user?.custId,
        username: user?.userName,
        firstname: user?.firstName,
        lastname: user?.lastName
    }
    return (
        <Modal isOpen={isOpen} toggle={toggle} unmountOnClose={true}>
            <ModalHeader toggle={toggle}>Edit User Information</ModalHeader>
            <ModalBody>
                {message &&
                    <Alert className={"text-center"} color={isSuccessful ? 'success' : 'danger'} role="alert">
                        {message}
                    </Alert>
                }
                <EditUserForm onSubmit={handleSubmit} initialValues={userInfor} />
            </ModalBody>
        </Modal>
    );
};

EditUserModal.propTypes = {
    isOpen: ProTypes.bool.isRequired,
    user: ProTypes.object,
    message: ProTypes.string,
    isSuccessful: ProTypes.bool,
    toggle: ProTypes.func.isRequired,
    updateUser: ProTypes.func.isRequired,
    callback: ProTypes.func
};

const connectEditUserModal = connect(
    state => state.editUser,
    dispath => bindActionCreators(actions, dispath)
)(EditUserModal);

export { connectEditUserModal as EditUserModal };