import React from 'react';
const { Form, FormGroup, Label, Input, Col } = require("reactstrap");
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';

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
            <FormGroup row>
                <Label sm={4}>First Name</Label>
                <Col sm={8}>
                    <Input type="text" name="firstname" defaultValue={initialValues.firstname} />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label sm={4}>Last Name</Label>
                <Col sm={8}>
                    <Input type="text" name="lastname" defaultValue={initialValues.lastname} />
                </Col>
            </FormGroup>
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