import React from 'react';
const { Form, FormGroup, Label, Input, Col } = require("reactstrap");
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

const renderField = (field) => (
    <FormGroup row>
        <Label sm={4}>{field.label}</Label>
        <Col className={field.meta.asyncValidating ? 'async-validating' : ''} sm={8}>
            <Input {...field.input} type={field.type} autoComplete="off" />
            {field.meta.touched && field.error && <span>{field.error}</span>}
        </Col>
    </FormGroup>
);

const EditUserInforForm = (props) => {
    const { handleSubmit, groups, initialValues } = props;

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup row>
                <Label sm={4}>User Name</Label>
                <Col sm={8}>
                    <Input name="username" plaintext defaultValue={initialValues.username} />
                </Col>
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
                        {groups && groups.map(group =>
                            <option key={group.value} value={group.value}>{group.label}</option>
                        )};
                    </Input>
                </Col>
            </FormGroup>
            <Input type="submit" value="Submit" />
        </Form>
    );
}

EditUserInforForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    groups: PropTypes.array,
    initialValues: PropTypes.object
};

export default reduxForm({
    form: 'editUserInforForm',
    enableReinitialize: true
})(EditUserInforForm)