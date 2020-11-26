import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Col, Button, FormFeedback, Spinner } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { toggleModal, add } from './reducer';
import { UserGroupSelectOptions } from '../../../common/models/UserGroup';
import FormikSelect from '../../../common/components/select/FormikSelect';

const validationSchema = Yup.object().shape({
  userName: Yup.string()
    .required('User Name is required'),
  password: Yup.string()
    .required('Password is required'),
  firstName: Yup.string()
    .required('First Name is required'),
  lastName: Yup.string()
    .required('Last Name is required')
});

const AddNewUserModal = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector(state => state.addNewUser);

  return (
    <Modal isOpen={isOpen} unmountOnClose>
      <Formik
        initialValues={{
          userName: '',
          password: '',
          firstName: '',
          lastName: '',
          groupId: UserGroupSelectOptions[0].value
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(add(values), () => setSubmitting(false));
        }}
      >
        {({
          errors,
          touched,
          handleSubmit,
          isSubmitting
        }) => (
            <Form onSubmit={handleSubmit}>
              <fieldset disabled={isSubmitting}>
                <ModalHeader {...(!isSubmitting && { toggle: () => dispatch(toggleModal()) })}>
                  Add New User
              </ModalHeader>
                <ModalBody>
                  <FormGroup row>
                    <Label sm={4}>User Name</Label>
                    <Col sm={8}>
                      <Input name="userName" type="text" autoComplete="off" tag={Field} invalid={errors.userName && touched.userName} />
                      <FormFeedback>{errors.userName}</FormFeedback>
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
                    <Label sm={4}>Group</Label>
                    <Col sm={8}>
                      <FormikSelect name="groupId" options={UserGroupSelectOptions} />
                    </Col>
                  </FormGroup>
                  <ModalFooter>
                    <Button type="submit" color="primary">
                      {isSubmitting && <Spinner className='mr-3' />}
                      Submit
                    </Button>
                  </ModalFooter>
                </ModalBody>
              </fieldset>
            </Form>
          )}
      </Formik>
    </Modal>
  );
};

export default AddNewUserModal;