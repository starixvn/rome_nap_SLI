import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import ProTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from './reducer';
import EditUserInforForm from './EditUserForm';

const EditUserModal = ({ isOpen, user, toggle }) => {
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
                <EditUserInforForm initialValues={userInfor} />
            </ModalBody>
        </Modal>
    );
};

EditUserModal.propTypes = {
    isOpen: ProTypes.bool.isRequired,
    user: ProTypes.object,
    toggle: ProTypes.func.isRequired
};

const connectEditUserModal = connect(
    state => state.editUser,
    dispath => bindActionCreators(actions, dispath)
)(EditUserModal);

export { connectEditUserModal as EditUserModal };