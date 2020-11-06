import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import './SideBar.scss';
import { Form, Input } from 'reactstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { CustomerPage } from '../../../features/customer/CustomerPage';
import { actions } from './reducer';

const SideBar = ({ queryUsernameSuggestion, queryUserInformation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [username, setUsername] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    queryUserInformation(username);
  };

  const handleSearch = (value) => {
    setIsLoading(true);
    setUsername(value);
    queryUsernameSuggestion(value)
      .then((items) => {
        setOptions(items);
        setIsLoading(false);
      });
  };

  const handleChange = (option) => {
    option && option.length > 0 && setUsername(option[0].username);
  }

  return (
    <div>
      <Form id="searchUsername" inline className="form-search" onSubmit={handleSubmit}>
        <div className="username mr-2">
          <AsyncTypeahead
            filterBy={() => true}
            id="async-example"
            isLoading={isLoading}
            labelKey="username"
            minLength={2}
            options={options}
            placeholder="Input an username"
            onSearch={handleSearch}
            onChange={handleChange}
            renderMenuItemChildren={(option) => (
              <Fragment>
                <span>{option.username}</span>
              </Fragment>
            )}
          />
        </div>
        <Input className="form-search-btn" type="submit" value="Search" />
      </Form>

      <CustomerPage></CustomerPage>
    </div>
  );
}

SideBar.propTypes = {
  queryUsernameSuggestion: PropTypes.func.isRequired,
  queryUserInformation: PropTypes.func.isRequired
};

const connectedSideBar = connect(
  null,
  dispatch => bindActionCreators(actions, dispatch)
)(SideBar);

export { connectedSideBar as SideBar };