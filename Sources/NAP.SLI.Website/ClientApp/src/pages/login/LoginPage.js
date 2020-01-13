import React, { useState } from 'react';
import { Form, Input, Button, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from "react-router";
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiAccount, mdiLock } from '@mdi/js';
import { authenticationActions } from '../../reducers/Authentication';
import './LoginPage.scss';
import { ReactComponent as Firefox } from './firefox.svg';
import { ReactComponent as Chrome } from './chrome.svg';

const LoginPage = ({ login, loggingIn, message, loggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = event => {
    event.preventDefault();
    login(username.trim(), password);
  };

  if (loggedIn) {
    return <Redirect to='/' />;
  }

  return (
    <Form className="login-page" onSubmit={handleSubmit} noValidate>
      {message && <Alert color="danger" className="text-center" role="alert">
        {message}
      </Alert>}
      <FormGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <Icon path={mdiAccount} size={1} />
            </InputGroupText>
          </InputGroupAddon>
          <Input type="text" placeholder="Username" maxLength="50" value={username} onChange={event => setUsername(event.target.value)} />
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <Icon path={mdiLock} size={1} />
            </InputGroupText>
          </InputGroupAddon>
          <Input type="password" placeholder="Password" maxLength="50" value={password} onChange={event => setPassword(event.target.value)} />
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <Button type="submit" color="primary" className="btn-block" disabled={loggingIn}>Login</Button>
      </FormGroup>
      <div>
        Best view in <Firefox className="browser-icon" />Firefox 60+ <Chrome className="browser-icon" />Chrome 67+
      </div>
    </Form>
  );
};

LoginPage.propTypes = {
  loggingIn: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  message: PropTypes.string
};

const connectedLoginPage = connect(
  state => state.authentication,
  dispatch => bindActionCreators(authenticationActions, dispatch)
)(LoginPage);

export { connectedLoginPage as LoginPage };