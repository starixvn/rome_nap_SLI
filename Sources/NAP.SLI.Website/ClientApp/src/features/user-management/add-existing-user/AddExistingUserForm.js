import React from 'react';
import { Col, FormGroup, Label, Input, Form, Button } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
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

const AddExistingUserForm = ({ handleSubmit }) => {

    return (
        <Form onSubmit={handleSubmit}>
            <Field
                name="username"
                label="User Name"
                component={renderField}
            />
            <Field name="group" label="Group" component={renderSelect}>
                {UserGroupSelectOptions.map(group =>
                    <option key={group.value} value={group.value}>{group.label}</option>
                )};
            </Field>
            <FormGroup row className="mt-5">
                <Label sm={4}></Label>
                <Col sm={8}>
                    <Button type="submit" color="primary">Submit</Button>
                </Col>
            </FormGroup>
        </Form>
    );
};

AddExistingUserForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
    form: "addExistingUserForm",
    enableReinitialize: true
})(AddExistingUserForm);