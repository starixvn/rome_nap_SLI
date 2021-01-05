import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Col, Input, Button, Form, FormFeedback, Spinner } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { toggleModal, add, AddExistingUserProps } from './reducer';
import { UserGroupSelectOptions } from '../../../common/utils/UserGroupUtils';
import FormikSelect from '../../../common/components/select/FormikSelect';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('User Name is required')
});

const AddExistingUserModal: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.addExistingUser);

  const initialValues: AddExistingUserProps = {
    username: '',
    groupId: UserGroupSelectOptions[0].value
  };
  return (
    <Modal isOpen={isOpen} unmountOnClose>
      <Formik
        initialValues={initialValues}
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
                    <Input name="username" type="text" autoComplete="off" tag={Field} invalid={!!errors.username && !!touched.username} />
                    <FormFeedback>{errors.username}</FormFeedback>
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