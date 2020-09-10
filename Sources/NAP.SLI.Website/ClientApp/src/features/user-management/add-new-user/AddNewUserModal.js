import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { actions } from "./reducer";
import AddNewUserForm from "./AddNewUserForm";

const AddNewUserModal = ({ isOpen, groups , isSuccessful, message, toggle, handleSubmit }) => {

    return (
        <Modal isOpen={isOpen} toggle={toggle} unmountOnClose={true}>
            <ModalHeader toggle={toggle}>Add New User</ModalHeader>
            <ModalBody>
                {message &&
                    <div className={`text-center alert ${isSuccessful ? 'alert-success' : 'alert-danger'}`} role="alert">
                        {message}
                    </div>
                }
                <AddNewUserForm onSubmit={handleSubmit} groups={groups}/>
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
    handleSubmit: PropTypes.func.isRequired
};

const connectedAddNewUserModal = connect(
    state => state.addnewUser,
    dispatch => bindActionCreators(actions, dispatch)
)(AddNewUserModal);

export { connectedAddNewUserModal as AddNewUserModal };