import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Col,
  Input,
  Button,
  Form,
  FormFeedback,
  Spinner,
} from 'reactstrap';
import { useSelector, batch } from 'react-redux';
import { Formik, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { toggleModal, addExisting, AddExistingUserProps } from './reducer';
import { UserGroupSelectOptions } from 'utils/UserGroupUtils';
import FormikSelect from 'components/select/FormikSelect';
import { useAppDispatch } from 'app/store';
import { error, success } from 'components/toast/reducer';
import { query } from '../reducer';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('User Name is required'),
});

const AddExistingUserModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useSelector((state: AppState) => state.addExistingUser);
  const { queryArg } = useSelector((state: AppState) => state.userManagement);

  const handleAdd = async (
    values: AddExistingUserProps,
    { setSubmitting }: FormikHelpers<AddExistingUserProps>,
  ) => {
    setSubmitting(true);
    const resultAction = await dispatch(addExisting(values));
    setSubmitting(false);

    if (addExisting.fulfilled.match(resultAction)) {
      const resultData = resultAction.payload;
      if (resultData.isSuccess) {
        batch(async () => {
          dispatch(success('Updated successfully'));
          dispatch(toggleModal());
          dispatch(query(queryArg));
        });
      } else {
        dispatch(error(resultData.errMsg));
      }
    }
  };

  const initialValues: AddExistingUserProps = {
    username: '',
    groupId: UserGroupSelectOptions[0].value,
  };
  return (
    <Modal isOpen={isOpen} unmountOnClose>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleAdd}
      >
        {({ errors, touched, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <fieldset disabled={isSubmitting}>
              <ModalHeader
                {...(!isSubmitting && {
                  toggle: () => dispatch(toggleModal()),
                })}
              >
                Add Existing User
              </ModalHeader>
              <ModalBody>
                <FormGroup row>
                  <Label sm={4}>User Name</Label>
                  <Col sm={8}>
                    <Input
                      name="username"
                      type="text"
                      autoComplete="off"
                      tag={Field}
                      invalid={!!errors.username && !!touched.username}
                    />
                    <FormFeedback>{errors.username}</FormFeedback>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={4}>Group</Label>
                  <Col sm={8}>
                    <FormikSelect
                      name="groupId"
                      options={UserGroupSelectOptions}
                    />
                  </Col>
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button type="submit" color="primary">
                  {isSubmitting && <Spinner className="mr-3" />}
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
