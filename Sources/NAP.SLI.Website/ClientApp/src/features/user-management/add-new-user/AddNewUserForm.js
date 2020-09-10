import React from 'react';
import { reduxForm, Field } from 'redux-form'
import { Form, FormGroup, Label, Input, Col } from 'reactstrap';
import PropTypes from 'prop-types';

const renderField = (field) => (
    <FormGroup row>
        <Label sm={4}>{field.label}</Label>
        <Col className={field.meta.asyncValidating ? 'async-validating' : ''} sm={8}>
            <Input {...field.input} type={field.type} />
            {field.meta.touched && field.error && <span>{field.error}</span>}
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

const AddNewUserForm = props => {
    const { handleSubmit, groups } = props;

    return (<Form onSubmit={handleSubmit}>
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
        <FormGroup row>
            <Label sm={4}>Group</Label>
            <Col sm={8}>
                <Input type="select" name="group">
                    {groups && groups.map(group =>
                        <option key={group.value} value={group.value}>{group.label}</option>
                    )};
                </Input>
            </Col>

        </FormGroup>
        <Input type="submit" value="Submit" />
    </Form>);
};


AddNewUserForm.propTypes = {
    groups: PropTypes.array,
    handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
    form: 'addNewUserForm',
    validate,
    enableReinitialize: true
})(AddNewUserForm)