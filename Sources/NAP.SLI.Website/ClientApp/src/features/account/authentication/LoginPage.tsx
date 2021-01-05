import './LoginPage.scss';
import React, { useEffect } from 'react';
import { Form, Input, Button, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Alert, Spinner, FormFeedback } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import Icon from '@mdi/react';
import { mdiAccount, mdiLock } from '@mdi/js';
import { login } from './reducer';
import { ReactComponent as Firefox } from './images/firefox.svg';
import { ReactComponent as Chrome } from './images/chrome.svg';
import { RouteLinks } from '../../../common/utils/RouteUtils';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required'),
  password: Yup.string()
    .required('Password is required')
});

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { message, account } = useSelector((state: RootState) => state.authentication);
  const isLoggedIn = account !== undefined;

  useEffect(() => {
    if (isLoggedIn) {
      history.push(RouteLinks.HOME);
    }
  });

  const initialValues = {
    username: '',
    password: ''
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(login(values, () => setSubmitting(false)));
      }}
    >
      {({
        errors,
        touched,
        handleSubmit,
        isSubmitting
      }) => (
        <Form className="login-page" onSubmit={handleSubmit}>
          <fieldset disabled={isSubmitting}>
            {message && <Alert color="danger" className="text-center" role="alert">
              {message}
            </Alert>}
            <FormGroup className="mb-5">
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <Icon path={mdiAccount} />
                  </InputGroupText>
                </InputGroupAddon>
                <Input name="username" type="text" autoComplete="off" tag={Field} invalid={!!errors.username && !!touched.username} />
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
                <Input name="password" type="password" autoComplete="off" tag={Field} invalid={!!errors.password && !!touched.password} />
                <FormFeedback tooltip>{errors.password}</FormFeedback>
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Button type="submit" color="primary" className="btn-block">
                {isSubmitting && <Spinner className='mr-3' />}
                  Login
                </Button>
            </FormGroup>
            <div>
              Best view in <Firefox className="browser-icon" /> Firefox 60+  <Chrome className="browser-icon" /> Chrome 67+
            </div>
          </fieldset>
        </Form>
      )}
    </Formik>
  );
};

export default LoginPage;