import React from 'react';
import { reduxForm, Fields } from 'redux-form'
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { required } from '../../../common/utils/FieldValidation';
import { matchPassword } from '../../../common/utils/ChangePasswordValidation';

const renderFields = (fields) => (
    <div>
        <FormGroup row>
            <Label>{fields.newPassword.label}</Label>
            <div className={fields.newPassword.meta.asyncValidating ? 'async-validating' : ''}>
                <Input {...fields.newPassword.input} type={fields.newPassword.type} placeholder={fields.newPassword.label} />
                {fields.newPassword.meta.touched && fields.newPassword.meta.error && <span>{fields.newPassword.meta.error}</span>}
            </div>
        </FormGroup>
        <FormGroup row>
            <Label>{fields.confirmPassword.label}</Label>
            <div className={fields.confirmPassword.meta.asyncValidating ? 'async-validating' : ''}>
                <Input {...fields.confirmPassword.input} type={fields.confirmPassword.type} placeholder={fields.confirmPassword.label} />
                {fields.confirmPassword.meta.touched && fields.confirmPassword.meta.error && <span>{fields.confirmPassword.meta.error}</span>}
            </div>
        </FormGroup>
    </div>
);

const ResetUserPasswordForm = props => {
    const { handleSubmit, username } = props;

    return (<Form onSubmit={handleSubmit}>
        <FormGroup row>
            <Label>Username</Label>
            <Input plaintext value={username} />
        </FormGroup>
        <Fields
        names={[ 'newPassword', 'confirmPassword' ]}
        component={renderFields}
        validate = {{
            newPassword: required,
            confirmPassword: [required, matchPassword]
        }}
        />
    </Form>);
};

export default reduxForm({
    form: 'resetUserPasswordForm',
    enableReinitialize: true
  })(ResetUserPasswordForm)