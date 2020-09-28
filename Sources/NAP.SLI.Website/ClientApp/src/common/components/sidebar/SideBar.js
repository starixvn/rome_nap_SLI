import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import './SideBar.scss';
import { Form, Input } from 'reactstrap';
import AsyncSelect from 'react-select/async';
import { CustomerPage } from '../../../features/customer/CustomerPage';
import { actions } from './reducer';

const SideBar = ({ queryUsername }) => {

  const handleSubmit = event => {
    event.preventDefault();
  };

  const handleQueryUsername = (value) => {
    return queryUsername(value);
  };

  return (
    <div>
      <Form id="searchUsername" inline className="form-search" onSubmit={handleSubmit}>
        <div className="username mr-2">
          <AsyncSelect name="searchUsername" placeholder="Username"
            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
            loadOptions={handleQueryUsername}
          />
        </div>
        <Input className="form-search-btn" type="submit" value="Search" />
      </Form>

      <CustomerPage></CustomerPage>
    </div>
  );
}

SideBar.propTypes = {
  queryUsername: PropTypes.func
};

const connectedSideBar = connect(
  null,
  dispatch => bindActionCreators(actions, dispatch)
)(SideBar);

export { connectedSideBar as SideBar };