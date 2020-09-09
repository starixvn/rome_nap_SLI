import React from 'react';
import { reduxForm, Fields } from 'redux-form'
import { Form, FormGroup, Label, Input, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { required } from '../../../common/utils/FieldValidation';
import { matchPassword } from '../../../common/utils/ChangePasswordValidation';

const renderFields = (fields) => (
    <div>
        <FormGroup row>
            <Label sm={4}>New Password</Label>
            <Col className={fields.newPassword.meta.asyncValidating ? 'async-validating' : ''} sm={8}>
                <Input {...fields.newPassword.input} type={fields.newPassword.type} placeholder={fields.newPassword.label} />
                {fields.newPassword.meta.touched && fields.newPassword.meta.error && <span>{fields.newPassword.meta.error}</span>}
            </Col>
        </FormGroup>
        <FormGroup row>
            <Label sm={4}>Confirm Password</Label>
            <Col sm={8} className={fields.confirmPassword.meta.asyncValidating ? 'async-validating' : ''}>
                <Input {...fields.confirmPassword.input} type={fields.confirmPassword.type} placeholder={fields.confirmPassword.label} />
                {fields.confirmPassword.meta.touched && fields.confirmPassword.meta.error && <span>{fields.confirmPassword.meta.error}</span>}
            </Col>
        </FormGroup>
    </div>
);

const ResetUserPasswordForm = props => {
    const { handleSubmit, username } = props;

    return (<Form onSubmit={handleSubmit}>
        <FormGroup row>
            <Label sm={4}>Username</Label>
            <Col sm={8}>
                <Input plaintext value={username} />
            </Col>
        </FormGroup>
        <Fields
            names={['newPassword', 'confirmPassword']}
            component={renderFields}
            validate={{
                newPassword: required,
                confirmPassword: [required, matchPassword]
            }}
        />
    </Form>);
};


ResetUserPasswordForm.propTypes = {
    username: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
    form: 'resetUserPasswordForm',
    enableReinitialize: true
})(ResetUserPasswordForm)