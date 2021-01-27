import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Button,
  FormFeedback,
  Spinner,
  ModalFooter,
} from 'reactstrap';
import { useSelector, batch } from 'react-redux';
import { Formik, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { update, closeModal, UpdateProps } from './reducer';
import { UserGroupSelectOptions } from 'utils/UserGroupUtils';
import FormikSelect from 'components/select/FormikSelect';
import { useAppDispatch } from 'app/store';
import { error, success } from 'components/toast/reducer';
import { patchUser } from '../reducer';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
});

const EditUserModal = () => {
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: AppState) => state.editUser);

  if (!user) {
    return <></>;
  }

  const handleUpdate = async (
    values: UpdateProps,
    { setSubmitting }: FormikHelpers<UpdateProps>,
  ) => {
    setSubmitting(true);
    const resultAction = await dispatch(update(values));
    setSubmitting(false);

    if (update.fulfilled.match(resultAction)) {
      const resultData = resultAction.payload;
      if (resultData.isSuccess) {
        batch(() => {
          dispatch(success('Updated successfully'));
          dispatch(closeModal());
          dispatch(patchUser({ data: values }));
        });
      } else {
        dispatch(error(resultData.errMsg));
      }
    }
  };

  const initialValues = {
    custId: user.custId,
    firstName: user.firstName,
    lastName: user.lastName,
    groupId: user.groupId,
  };
  return (
    <Modal isOpen unmountOnClose>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleUpdate}
      >
        {({ errors, touched, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <fieldset disabled={isSubmitting}>
              <ModalHeader
                {...(!isSubmitting && { toggle: () => dispatch(closeModal()) })}
              >
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

export default EditUserModal;
