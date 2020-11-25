import React from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Col, Button, FormFeedback, Spinner } from 'reactstrap';
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

  return (
    <Modal isOpen={isOpen} unmountOnClose={true}>
      <Formik
        initialValues={{ ...user }}
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
            <>
              <ModalHeader {...(!isSubmitting && { toggle: () => dispatch(toggleModal()) })}>
                Edit User Information
              </ModalHeader>
              <ModalBody>
                <Form onSubmit={handleSubmit}>
                  <fieldset disabled={isSubmitting}>
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
                    <FormGroup row className="mt-5">
                      <Label sm={4}></Label>
                      <Col sm={8}>
                        <Button type="submit" color="primary">
                          {isSubmitting && <Spinner className='mr-3' />}
                          Submit
                        </Button>
                      </Col>
                    </FormGroup>
                  </fieldset>
                </Form>
              </ModalBody>
            </>
          )}
      </Formik>
    </Modal>
  );
};

export default EditUserModal;