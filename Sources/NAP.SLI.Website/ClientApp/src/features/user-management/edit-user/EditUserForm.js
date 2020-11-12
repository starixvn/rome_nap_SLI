import React from 'react';
import { Form, FormGroup, Label, Input, Col, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
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

const EditUserForm = ({ handleSubmit, initialValues }) => {

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup row>
                <Label sm={4}>User Name</Label>
                <Label sm={8}>{initialValues.username}</Label>
            </FormGroup>
            <Field
                name="firstname"
                label="First Name"
                component={renderField}
                defaultValue={initialValues.firstname} />
            <Field
                name="lastname"
                label="Last Name"
                component={renderField}
                defaultValue={initialValues.firstname} />
            <FormGroup row>
                <Label sm={4}>Groups</Label>
                <Col sm={8}>
                    <Input type="select" name="group">
                        {UserGroupSelectOptions.map(group =>
                            <option key={group.value} value={group.value}>{group.label}</option>
                        )};
                    </Input>
                </Col>
            </FormGroup>
            <FormGroup row className="mt-5">
                <Label sm={4}></Label>
                <Col sm={8}>
                    <Button type="submit" color="primary">Submit</Button>
                </Col>
            </FormGroup>
        </Form>
    );
}

EditUserForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object
};

export default reduxForm({
    form: 'editUserForm',
    enableReinitialize: true
})(EditUserForm)