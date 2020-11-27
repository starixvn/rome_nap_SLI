import './SideBar.scss';
import React, { useState } from 'react';
import { Button, Form, Navbar, Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import CustomerPage from './customer/Page';
import { queryUsernameSuggestion, getCustomerInformation } from './reducer';

const SideBar = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const { customer, message } = useSelector(state => state.sidebar);

  const handleSearch = (value, setFieldValue) => {
    setIsLoading(true);
    setFieldValue('username', value);
    queryUsernameSuggestion(value)
      .then((items) => {
        setOptions(items);
        setIsLoading(false);
      });
  };

  const handleChange = (option, setFieldValue) => {
    option && option.length > 0 && setFieldValue('username', option[0].username);
  }

  return (
    <div className="sidebar border-right">
      <Navbar className="navbar-expand border-bottom box-shadow">
        <Formik
          initialValues={{
            username: ''
          }}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(getCustomerInformation(values.username, () => setSubmitting(false)));
          }}
        >
          {({
            handleSubmit,
            isSubmitting,
            setFieldValue
          }) => (
              <Form inline className="form-search" onSubmit={handleSubmit}>
                <div className="username mr-3">
                  <AsyncTypeahead
                    id='username-suggestion'
                    filterBy={() => true}
                    isLoading={isLoading}
                    labelKey="username"
                    minLength={2}
                    options={options}
                    placeholder="Input an username"
                    onSearch={(value) => handleSearch(value, setFieldValue)}
                    onChange={(option) => handleChange(option, setFieldValue)}
                    renderMenuItemChildren={option => <span>{option.username}</span>}
                  />
                </div>
                <Button type="submit" color="primary">
                  {isSubmitting && <Spinner className='mr-3' />}
                  Search
                </Button>
              </Form>
            )}
        </Formik>
      </Navbar>
      {message && <div>{message}</div>}
      {customer && <CustomerPage></CustomerPage>}
    </div>
  );
}

export default SideBar;