import React from 'react';
import { Col, FormGroup, Label, Input, Form } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';


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

const AddExistUserForm = props => {
    const { handleSubmit, groups } = props;

    return (
        <Form onSubmit={handleSubmit}>
            <Field
                name="username"
                label="User Name"
                component={renderField}
            />
            <Field name="group" label="Group" component={renderSelect}>
                {groups && groups.map(group =>
                    <option key={group.value} value={group.value}>{group.label}</option>
                )};
            </Field>
            <Input type="submit" value="Submit" />
        </Form>
    );
};

AddExistUserForm.propTypes = {
    groups: PropTypes.array,
    handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
    form: "addExistUserForm",
    enableReinitialize: true
})(AddExistUserForm);