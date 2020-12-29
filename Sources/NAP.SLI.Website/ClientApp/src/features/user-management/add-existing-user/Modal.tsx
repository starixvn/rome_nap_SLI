import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Col, Input, Button, Form, FormFeedback, Spinner } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { toggleModal, add, AddExistProps } from './reducer';
import { UserGroupSelectOptions } from '../../../common/utils/UserGroupUtils';
import FormikSelect from '../../../common/components/select/FormikSelect';
import { RootState } from '../../../store';

const validationSchema = Yup.object().shape({
  userName: Yup.string()
    .required('User Name is required')
});

const AddExistingUserModal: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.addExistingUser);

  var initValues: AddExistProps = {
    userName: '',
    groupId: UserGroupSelectOptions[0].value,
    isAddNew: false
  }

  return (
    <Modal isOpen={isOpen} unmountOnClose>
      <Formik
        initialValues={initValues}
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
                    <Input name="userName" type="text" autoComplete="off" tag={Field} invalid={errors.userName != undefined && touched.userName != undefined} />
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