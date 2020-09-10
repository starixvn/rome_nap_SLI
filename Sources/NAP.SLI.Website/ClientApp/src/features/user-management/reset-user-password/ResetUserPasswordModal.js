import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { actions } from "./reducer";
import ResetUserPasswordForm from "./ResetUserPasswordForm";

const ResetUserPasswordModal = ({ username, custId, isOpen, isSuccessful, message, toggle, handleSubmit }) => {

    return (
        <Modal isOpen={isOpen} toggle={toggle} unmountOnClose={true}>
            <ModalHeader toggle={toggle}>Reset Password</ModalHeader>
            <ModalBody>
                {message &&
                    <div className={`text-center alert ${isSuccessful ? 'alert-success' : 'alert-danger'}`} role="alert">
                        {message}
                    </div>
                }
                <ResetUserPasswordForm onSubmit={handleSubmit} username={username} initialValues={{ custId: custId }} />
            </ModalBody>
        </Modal>
    );
};

ResetUserPasswordModal.propTypes = {
    username: PropTypes.string.isRequired,
    custId: PropTypes.number.isRequired,
    isOpen: PropTypes.bool.isRequired,
    isSuccessful: PropTypes.bool,
    message: PropTypes.string,
    toggle: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

const connectedResetUserPasswordModal = connect(
    state => state.resetUserPassword,
    dispatch => bindActionCreators(actions, dispatch)
)(ResetUserPasswordModal);

export { connectedResetUserPasswordModal as ResetUserPasswordModal };