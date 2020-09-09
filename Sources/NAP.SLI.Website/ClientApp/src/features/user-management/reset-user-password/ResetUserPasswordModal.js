import React from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { actions } from "./reducer";
import ResetUserPasswordForm from "./ResetUserPasswordForm";

const ResetUserPasswordModal = ({ username, custId, isOpen }) => {

    return (
        <Modal isOpen={isOpen}>
            <ModalHeader>Reset Password</ModalHeader>
            <ModalBody>
                <ResetUserPasswordForm username={username} initialValues={{ custId: custId }} />
            </ModalBody>
        </Modal>
    );
};

ResetUserPasswordModal.propTypes = {
    username: PropTypes.string.isRequired,
    custId: PropTypes.number.isRequired,
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired
};

const connectedResetUserPasswordModal = connect(
    state => state.resetUserPassword,
    dispatch => bindActionCreators(actions, dispatch)
)(ResetUserPasswordModal);

export { connectedResetUserPasswordModal as ResetUserPasswordModal };