import React from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Col, Button, FormFeedback } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { update, toggleModal } from './reducer';
import { UserGroupSelectOptions } from '../../../common/models/UserGroup';
import FormikSelect from '../../../common/components/select/FormikSelect';

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Required'),
  lastName: Yup.string()
    .required('Required')
});

const EditUserModal = () => {
  const dispatch = useDispatch();
  const { isOpen, user } = useSelector(state => state.editUser);

  const handleToggle = () => {
    dispatch(toggleModal());
  }

  return (
    <Modal isOpen={isOpen} toggle={handleToggle} unmountOnClose={true}>
      <ModalHeader toggle={handleToggle}>Edit User Information</ModalHeader>
      <ModalBody>
        <Formik
          initialValues={{ ...user }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
            //dispatch(update(values));
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

export default EditUserModal;