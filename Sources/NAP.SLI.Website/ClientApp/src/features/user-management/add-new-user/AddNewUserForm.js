import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Form, FormGroup, Label, Input, Col, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { UserGroupSelectOptions } from '../../../common/models/UserGroup';

const renderField = (field) => (
    <FormGroup row>
        <Label sm={4}>{field.label}</Label>
        <Col className={field.meta.asyncValidating ? 'async-validating' : ''} sm={8}>
            <Input {...field.input} type={field.type} autoComplete="off" />
            {field.meta.touched && field.error && <span>{field.error}</span>}
        </Col>
    </FormGroup>
);

const renderSelect = (field) => (
    <FormGroup row>
        <Label sm={4}>{field.label}</Label>
        <Col sm={8}>
            <Input {...field.input} type="select">
                {field.children}
            </Input>
        </Col>
    </FormGroup>
);

const validate = (values) => {
    const errors = {}
    if (!values.username) {
        errors.username = 'Required'
    }
    if (!values.password) {
        errors.password = 'Required'
    }
    return errors
}

const AddNewUserForm = ({ handleSubmit }) => {

    return (
        <Form onSubmit={handleSubmit}>
            <Field
                name="username"
                label="User Name"
                component={renderField}
            />
            <Field
                name="password"
                label="Password"
                component={renderField}
                type="password"
            />
            <Field
                name="firstname"
                label="First Name"
                component={renderField}
            />
            <Field
                name="lastname"
                label="Last Name"
                component={renderField}
            />
            <Field name="group" label="Group" component={renderSelect}>
                {UserGroupSelectOptions.map(group =>
                    <option key={group.value} value={group.value}>{group.label}</option>
                )};
            </Field>
            <FormGroup row>
                <Label sm={4}></Label>
                <Col sm={8}>
                    <Button type="submit" color="primary">Submit</Button>
                </Col>
            </FormGroup>
        </Form>
    );
};

AddNewUserForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
    form: 'addNewUserForm',
    validate,
    enableReinitialize: true,
    initialValues: { username: "", password: "" }
})(AddNewUserForm);