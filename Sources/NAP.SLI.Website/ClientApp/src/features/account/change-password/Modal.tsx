import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, Input, Button, FormGroup, Spinner, Col, FormFeedback } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { toggleModal, changePassword } from './reducer';

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required('Old Password is required'),
  newPassword: Yup.string()
    .required('New Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm Password is required')
});

const ChangePasswordModal: React.FC = () => {
  const dispatch = useDispatch();
  const { account } = useSelector((state: RootState) => state.authentication);
  const { isOpen } = useSelector((state: RootState) => state.changePassword);

  if (!account) {
    return <></>;
  }

  const { username } = account;
  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  return (
    <Modal isOpen={isOpen} unmountOnClose>
      <Formik
        initialValues={initialValues}
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
                    <Input name="oldPassword" type="password" autoComplete="off" tag={Field} invalid={!!errors.oldPassword && !!touched.oldPassword} />
                    <FormFeedback>{errors.oldPassword}</FormFeedback>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={4}>New Password</Label>
                  <Col sm={8}>
                    <Input name="newPassword" type="password" autoComplete="off" tag={Field} invalid={!!errors.newPassword && !!touched.newPassword} />
                    <FormFeedback>{errors.newPassword}</FormFeedback>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={4}>Confirm Password</Label>
                  <Col sm={8}>
                    <Input name="confirmPassword" type="password" autoComplete="off" tag={Field} invalid={!!errors.confirmPassword && !!touched.confirmPassword} />
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