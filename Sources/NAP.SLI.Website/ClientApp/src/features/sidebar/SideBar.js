import './SideBar.scss';
import React, { useState, createRef, useEffect } from 'react';
import { Button, Form, Navbar, Spinner, FormFeedback } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import CustomerPage from './customer/Page';
import { queryUsernameSuggestion, getCustomerInformation } from './reducer';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Required')
    .min(2, 'At least 2 characters')
});

const SideBar = () => {
  const typeaheadRef = createRef();
  const formikRef = createRef();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const { customer, message, username } = useSelector(state => state.sidebar);
  const history = useHistory();

  useEffect(() => {
    if (!username) {
      return;
    }

    const { clear } = typeaheadRef.current;
    clear();

    const { isSubmitting, handleSubmit } = formikRef.current;
    if (!isSubmitting) {
      handleSubmit();
    }
  }, [username]);

  const handleSearch = (value) => {
    setIsLoading(true);
    queryUsernameSuggestion(value)
      .then((items) => {
        setOptions(items);
        setIsLoading(false);
      });
  };

  const handleInputChange = (value, setFieldValue) => {
    setFieldValue('username', value);
    if (value.length >= 2) {
      handleSearch(value);
    }
  };

  const handleChange = (option, setFieldValue) => {
    option && option.length > 0 && setFieldValue('username', option[0].username);
  }

  return (
    <div className="sidebar border-right">
      <Navbar className="navbar-expand border-bottom box-shadow">
        <Formik
          innerRef={formikRef}
          enableReinitialize
          initialValues={{
            username
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(getCustomerInformation(values.username, history, () => setSubmitting(false)));
          }}
        >
          {({
            errors,
            touched,
            handleSubmit,
            isSubmitting,
            setFieldValue
          }) => (
              <Form inline className="form-search" onSubmit={handleSubmit}>
                <div className="username mr-3">
                  <AsyncTypeahead
                    ref={typeaheadRef}
                    id='username-suggestion'
                    className={errors.username && touched.username ? 'is-invalid' : ''}
                    filterBy={() => true}
                    isLoading={isLoading}
                    labelKey="username"
                    options={options}
                    placeholder="Input an username"
                    onInputChange={(value) => handleInputChange(value, setFieldValue)}
                    onChange={(option) => handleChange(option, setFieldValue)}
                    onSearch={(value) => handleSearch(value)}
                    renderMenuItemChildren={option => <span>{option.username}</span>}
                  />
                  {<FormFeedback tooltip>{errors.username}</FormFeedback>}
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