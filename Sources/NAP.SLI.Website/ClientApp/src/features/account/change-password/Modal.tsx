import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, Input, Button, FormGroup, Spinner, Col, FormFeedback } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { toggleModal, changePassword, ChangePasswordProps } from './reducer';

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required('Old Password is required'),
  newPassword: Yup.string()
    .required('New Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm Password is required')
});

const ChangePasswordModal = () => {
  const dispatch = useDispatch();
  const { username } = useSelector((state: RootState) => state.authentication.account);
  const { isOpen } = useSelector((state: RootState) => state.changePassword);

  const initValue: ChangePasswordProps = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  }

  return (
    <Modal isOpen={isOpen} unmountOnClose>
      <Formik
        initialValues={initValue}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(changePassword(values, () => setSubmitting(false)));
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
                {username} / Change Password
                </ModalHeader>
              <ModalBody>
                <FormGroup row>
                  <Label sm={4}>Old Password</Label>
                  <Col sm={8}>
                    <Input name="oldPassword" type="password" autoComplete="off" tag={Field} invalid={errors.oldPassword != undefined && touched.oldPassword != undefined} />
                    <FormFeedback>{errors.oldPassword}</FormFeedback>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={4}>New Password</Label>
                  <Col sm={8}>
                    <Input name="newPassword" type="password" autoComplete="off" tag={Field} invalid={errors.newPassword != undefined && touched.newPassword != undefined} />
                    <FormFeedback>{errors.newPassword}</FormFeedback>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={4}>Confirm Password</Label>
                  <Col sm={8}>
                    <Input name="confirmPassword" type="password" autoComplete="off" tag={Field} invalid={errors.confirmPassword != undefined && touched.confirmPassword != undefined} />
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


export default ChangePasswordModal;