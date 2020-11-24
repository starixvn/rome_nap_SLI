import React from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Col, Button, FormFeedback } from 'reactstrap';
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

  const handleToggle = () => {
    dispatch(toggleModal());
  }

  return (
    <Modal isOpen={isOpen} toggle={handleToggle}>
      <ModalHeader toggle={handleToggle}>Reset Password</ModalHeader>
      <ModalBody>
        <Formik
          initialValues={{
            password: '',
            confirmPassword: ''
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
            //dispatch(resetPassword(values));
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
                  <Label sm={4}>Password</Label>
                  <Col sm={8}>
                    <Input name="confirmPassword" type="password" autoComplete="off" tag={Field} invalid={errors.confirmPassword && touched.confirmPassword} />
                    <FormFeedback>{errors.confirmPassword}</FormFeedback>
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

export default ResetUserPasswordModal;