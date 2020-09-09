import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { actions } from './reducer';
import './SideBar.scss';

const SideBar = ({ isOpen, toggle }) => {

  const [username, setUsername] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <div className={classNames("sidebar", { "is-open": isOpen })}>
      <div className="sidebar-header">
        <span color="info" onClick={toggle} style={{ color: "#fff" }}>
          &times;
        </span>
      </div>
      <div className="side-menu">
        <Form inline className="form-customer" onSubmit={handleSubmit}>
          <FormGroup className="mr-5">
            <Label for="username" className="mr-2">Username</Label>
            <Input type="text" id="username" value={username} onChange={event => setUsername(event.target.value)} />
          </FormGroup>
          <Button type="submit">Search</Button>
        </Form>
      </div>
    </div>
  );
}

SideBar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
};

const connectedSideBar = connect(
  state => state.sideBar,
  dispatch => bindActionCreators(actions, dispatch)
)(SideBar);

export { connectedSideBar as SideBar };