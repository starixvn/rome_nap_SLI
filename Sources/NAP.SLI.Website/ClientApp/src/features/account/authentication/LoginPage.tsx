import './LoginPage.scss';
import React, { useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Alert,
  Spinner,
  FormFeedback,
} from 'reactstrap';
import { useSelector } from 'react-redux';
import { Formik, Field, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Icon from '@mdi/react';
import { mdiAccount, mdiLock } from '@mdi/js';
import { login, LoginProps } from './reducer';
import { ReactComponent as Firefox } from './images/firefox.svg';
import { ReactComponent as Chrome } from './images/chrome.svg';
import { useAppDispatch } from 'app/store';
import storage from 'services/storage';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { message } = useSelector((state: AppState) => state.authentication);
  const account = storage.get();

  useEffect(() => {
    if (account) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (
    values: LoginProps,
    { setSubmitting }: FormikHelpers<LoginProps>,
  ) => {
    setSubmitting(true);
    const resultAction = await dispatch(login(values));
    setSubmitting(false);

    if (login.fulfilled.match(resultAction)) {
      navigate('/');
    }
  };

  const initialValues = {
    username: '',
    password: '',
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {({ errors, touched, handleSubmit, isSubmitting }) => (
        <Form className="login-page" onSubmit={handleSubmit}>
          <fieldset disabled={isSubmitting}>
            {message && (
              <Alert color="danger" className="text-center" role="alert">
                {message}
              </Alert>
            )}
            <FormGroup className="mb-5">
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <Icon path={mdiAccount} />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  name="username"
                  type="text"
                  autoComplete="off"
                  tag={Field}
                  invalid={!!errors.username && !!touched.username}
                />
                <FormFeedback tooltip>{errors.username}</FormFeedback>
              </InputGroup>
            </FormGroup>
            <FormGroup className="mb-5">
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <Icon path={mdiLock} />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  name="password"
                  type="password"
                  autoComplete="off"
                  tag={Field}
                  invalid={!!errors.password && !!touched.password}
                />
                <FormFeedback tooltip>{errors.password}</FormFeedback>
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Button type="submit" color="primary" className="btn-block">
                {isSubmitting && <Spinner className="mr-3" />}
                Login
              </Button>
            </FormGroup>
            <div>
              Best view in <Firefox className="browser-icon" /> Firefox 60+{' '}
              <Chrome className="browser-icon" /> Chrome 67+
            </div>
          </fieldset>
        </Form>
      )}
    </Formik>
  );
};

export default LoginPage;
