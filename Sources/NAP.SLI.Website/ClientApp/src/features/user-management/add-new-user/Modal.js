import React from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Col, Button, FormFeedback } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { toggleModal, add } from './reducer';
import { UserGroupSelectOptions } from '../../../common/models/UserGroup';
import FormikSelect from '../../../common/components/select/FormikSelect';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Required'),
  password: Yup.string()
    .required('Required'),
  firstName: Yup.string()
    .required('Required'),
  lastName: Yup.string()
    .required('Required')
});

const AddNewUserModal = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector(state => state.addNewUser);

  const handleToggle = () => {
    dispatch(toggleModal());
  }

  return (
    <Modal isOpen={isOpen} toggle={handleToggle} unmountOnClose={true}>
      <ModalHeader toggle={handleToggle}>Add New User</ModalHeader>
      <ModalBody>
        <Formik
          initialValues={{
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            groupId: UserGroupSelectOptions[0].value
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
            dispatch(add(values));
          }}
        >
          {({
            errors,
            touched,
            handleSubmit,
            isSubmitting
          }) => (
              <Form onSubmit={handleSubmit}>
                <FormGroup row>
                  <Label sm={4}>User Name</Label>
                  <Col sm={8}>
                    <Input name="username" type="text" autoComplete="off" tag={Field} invalid={errors.username && touched.username} />
                    <FormFeedback>{errors.username}</FormFeedback>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={4}>Password</Label>
                  <Col sm={8}>
                    <Input name="password" type="password" autoComplete="off" tag={Field} invalid={errors.password && touched.password} />
                    <FormFeedback>{errors.password}</FormFeedback>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={4}>First Name</Label>
                  <Col sm={8}>
                    <Input name="firstName" type="text" autoComplete="off" tag={Field} invalid={errors.firstName && touched.firstName} />
                    <FormFeedback>{errors.firstName}</FormFeedback>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={4}>Last Name</Label>
                  <Col sm={8}>
                    <Input name="lastName" type="text" autoComplete="off" tag={Field} invalid={errors.lastName && touched.lastName} />
                    <FormFeedback>{errors.lastName}</FormFeedback>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={4}>Groups</Label>
                  <Col sm={8}>
                    <FormikSelect name="groupId" options={UserGroupSelectOptions} />
                  </Col>
                </FormGroup>
                <FormGroup row className="mt-5">
                  <Label sm={4}></Label>
                  <Col sm={8}>
                    <Button type="submit" color="primary" disabled={isSubmitting}>Submit</Button>
                  </Col>
                </FormGroup>
              </Form>
            )}
        </Formik>
      </ModalBody>
    </Modal>
  );
};

export default AddNewUserModal;