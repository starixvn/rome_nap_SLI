import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Col, Input, Button, Form, FormFeedback, Spinner } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { toggleModal, add } from './reducer';
import { UserGroupSelectOptions } from '../../../common/models/UserGroup';
import FormikSelect from '../../../common/components/select/FormikSelect';

const validationSchema = Yup.object().shape({
  userName: Yup.string()
    .required('User Name is required')
});

const AddExistingUserModal = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector(state => state.addExistingUser);

  return (
    <Modal isOpen={isOpen} unmountOnClose>
      <Formik
        initialValues={{
          userName: '',
          groupId: UserGroupSelectOptions[0].value
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(add(values, () => setSubmitting(false)));
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
                  Add Existing User
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

export default AddExistingUserModal;