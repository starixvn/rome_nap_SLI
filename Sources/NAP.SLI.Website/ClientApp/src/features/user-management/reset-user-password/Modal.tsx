// @ts-nocheck
import React from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Col, Button, FormFeedback, Spinner, ModalFooter } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { resetPassword, toggleModal } from './reducer';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required')
});

const ResetUserPasswordModal = () => {
  const dispatch = useDispatch();
  const { isOpen, user } = useSelector(state => state.resetUserPassword);

  return (
    <Modal isOpen={isOpen} unmountOnClose>
      <Formik
        initialValues={{
          custId: user.custId,
          password: '',
          confirmPassword: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(resetPassword(values, () => setSubmitting(false)));
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
                Reset Password
              </ModalHeader>
              <ModalBody>
                <FormGroup row>
                  <Label sm={4}>User Name</Label>
                  <Label sm={8}>{user.userName}</Label>
                </FormGroup>
                <FormGroup row>
                  <Label sm={4}>Password</Label>
                  <Col sm={8}>
                    <Input name="password" type="password" autoComplete="off" tag={Field} invalid={errors.password && touched.password} />
                    <FormFeedback>{errors.password}</FormFeedback>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={4}>Confirm Password</Label>
                  <Col sm={8}>
                    <Input name="confirmPassword" type="password" autoComplete="off" tag={Field} invalid={errors.confirmPassword && touched.confirmPassword} />
                    <FormFeedback>{errors.confirmPassword}</FormFeedback>
                  </Col>
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button type="submit" color="primary">
                  {isSubmitting && <Spinner className='mr-3' />}
                    Submit
                  </Button>
              </ModalFooter>
            </fieldset>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ResetUserPasswordModal;