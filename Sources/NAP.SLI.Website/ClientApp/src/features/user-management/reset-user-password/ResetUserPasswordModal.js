import React from 'react';
import { Alert, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { actions } from "./reducer";
import ResetUserPasswordForm from "./ResetUserPasswordForm";

const ResetUserPasswordModal = ({ username, custId, isOpen, isSuccessful, message, toggle, resetUserPassword }) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle} unmountOnClose={true}>
            <ModalHeader toggle={toggle}>Reset Password</ModalHeader>
            <ModalBody>
                {message &&
                    <Alert className={"text-center"} color={isSuccessful ? 'success' : 'danger'} role="alert">
                        {message}
                    </Alert>
                }
                <ResetUserPasswordForm onSubmit={resetUserPassword} username={username} initialValues={{ custId: custId }} />
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
    resetUserPassword: PropTypes.func.isRequired
};

const connectedResetUserPasswordModal = connect(
    state => state.resetUserPassword,
    dispatch => bindActionCreators(actions, dispatch)
)(ResetUserPasswordModal);

export { connectedResetUserPasswordModal as ResetUserPasswordModal };