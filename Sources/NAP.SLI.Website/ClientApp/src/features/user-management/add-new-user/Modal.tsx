import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Button,
  FormFeedback,
  Spinner,
} from 'reactstrap';
import { useSelector } from 'react-redux';
import { Formik, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { toggleModal, addNew, AddNewUserProps } from './reducer';
import { UserGroupSelectOptions } from 'utils/UserGroupUtils';
import FormikSelect from 'components/select/FormikSelect';
import { error, success } from 'components/toast/reducer';
import { query } from '../reducer';
import { useAppDispatch } from 'app/store';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('User Name is required'),
  password: Yup.string().required('Password is required'),
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
});

const AddNewUserModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useSelector((state: AppState) => state.addNewUser);
  const { arg } = useSelector((state: AppState) => state.userManagement);

  const handleAdd = async (
    values: AddNewUserProps,
    { setSubmitting }: FormikHelpers<AddNewUserProps>,
  ) => {
    setSubmitting(true);
    const resultAction = await dispatch(addNew(values));
    setSubmitting(false);

    if (addNew.fulfilled.match(resultAction)) {
      const resultData = resultAction.payload;
      if (resultData.isSuccess) {
        dispatch(success('Updated successfully'));
        dispatch(toggleModal());
        dispatch(query(arg));
      } else {
        dispatch(error(resultData.errMsg));
      }
    }
  };

  const initialValues: AddNewUserProps = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
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
                Add New User
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
                  <Label sm={4}>Password</Label>
                  <Col sm={8}>
                    <Input
                      name="password"
                      type="password"
                      autoComplete="off"
                      tag={Field}
                      invalid={!!errors.password && !!touched.password}
                    />
                    <FormFeedback>{errors.password}</FormFeedback>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={4}>First Name</Label>
                  <Col sm={8}>
                    <Input
                      name="firstName"
                      type="text"
                      autoComplete="off"
                      tag={Field}
                      invalid={!!errors.firstName && !!touched.firstName}
                    />
                    <FormFeedback>{errors.firstName}</FormFeedback>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={4}>Last Name</Label>
                  <Col sm={8}>
                    <Input
                      name="lastName"
                      type="text"
                      autoComplete="off"
                      tag={Field}
                      invalid={!!errors.lastName && !!touched.lastName}
                    />
                    <FormFeedback>{errors.lastName}</FormFeedback>
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
                <ModalFooter>
                  <Button type="submit" color="primary">
                    {isSubmitting && <Spinner className="mr-3" />}
                    Submit
                  </Button>
                </ModalFooter>
              </ModalBody>
            </fieldset>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddNewUserModal;
