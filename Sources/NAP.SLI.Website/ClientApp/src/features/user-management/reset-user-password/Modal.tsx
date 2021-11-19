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
import { resetPassword, closeModal, ResetPasswordProps } from './reducer';
import { useAppDispatch } from 'app/store';
import { error, success } from 'components/toast/reducer';
import { patchUser } from '../reducer';

const validationSchema = Yup.object().shape({
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const ResetUserPasswordModal = () => {
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: AppState) => state.resetUserPassword);

  const handleResetPassword = async (
    values: ResetPasswordProps,
    { setSubmitting }: FormikHelpers<ResetPasswordProps>,
  ) => {
    setSubmitting(true);
    const resultAction = await dispatch(resetPassword(values));
    setSubmitting(false);

    if (resetPassword.fulfilled.match(resultAction)) {
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

  if (!user) {
    return <></>;
  }

  const initialValues = {
    custId: user.userId,
    password: '',
    confirmPassword: '',
  };
  return (
    <Modal isOpen unmountOnClose>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleResetPassword}
      >
        {({ errors, touched, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <fieldset disabled={isSubmitting}>
              <ModalHeader
                {...(!isSubmitting && { toggle: () => dispatch(closeModal()) })}
              >
                Reset Password
              </ModalHeader>
              <ModalBody>
                <FormGroup row>
                  <Label sm={4}>User Name</Label>
                  <Label sm={8}>{user.userName}</Label>
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
                  <Label sm={4}>Confirm Password</Label>
                  <Col sm={8}>
                    <Input
                      name="confirmPassword"
                      type="password"
                      autoComplete="off"
                      tag={Field}
                      invalid={
                        !!errors.confirmPassword && !!touched.confirmPassword
                      }
                    />
                    <FormFeedback>{errors.confirmPassword}</FormFeedback>
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

export default ResetUserPasswordModal;
