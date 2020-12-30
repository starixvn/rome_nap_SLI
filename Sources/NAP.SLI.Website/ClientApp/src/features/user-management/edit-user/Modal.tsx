// @ts-nocheck
import React from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Col, Button, FormFeedback, Spinner, ModalFooter } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { update, toggleModal } from './reducer';
import { UserGroupSelectOptions } from '../../../common/utils/UserGroupUtils';
import FormikSelect from '../../../common/components/select/FormikSelect';

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First Name is required'),
  lastName: Yup.string()
    .required('Last Name is required')
});

const EditUserModal = () => {
  const dispatch = useDispatch();
  const { isOpen, user } = useSelector((state: RootState) => state.editUser);

  return (
    <Modal isOpen={isOpen} unmountOnClose>
      <Formik
        initialValues={user}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(update(values, () => setSubmitting(false)));
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
                Edit User Information
              </ModalHeader>
              <ModalBody>
                <FormGroup row>
                  <Label sm={4}>User Name</Label>
                  <Label sm={8}>{user.userName}</Label>
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

export default EditUserModal;