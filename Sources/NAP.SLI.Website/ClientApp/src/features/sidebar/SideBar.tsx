import './SideBar.scss';
import React, { useState, createRef, useEffect, RefObject } from 'react';
import { Button, Form, Navbar, Spinner, FormFeedback } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import CustomerPage from './customer/Page';
import { queryUsernameSuggestion, getCustomerInformation, QueryUsernameSuggestionRecord } from './reducer';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Required')
    .min(2, 'At least 2 characters')
});

const SideBar: React.FC = () => {
  const typeaheadRef: RefObject<AsyncTypeahead<QueryUsernameSuggestionRecord> & { clear: Func }> = createRef();
  const formikRef: RefObject<FormikProps<QueryUsernameSuggestionRecord>> = createRef();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<Array<QueryUsernameSuggestionRecord>>([]);
  const { customer, message, username } = useSelector((state: RootState) => state.sidebar);

  useEffect(() => {
    if (!username || !typeaheadRef.current || !formikRef.current) {
      return;
    }

    const { clear } = typeaheadRef.current;
    clear();

    const { isSubmitting, handleSubmit } = formikRef.current;
    if (!isSubmitting) {
      handleSubmit();
    }
  }, [username]);

  const handleSearch = (value: string) => {
    setIsLoading(true);
    queryUsernameSuggestion(value)
      .then((items) => {
        setOptions(items);
        setIsLoading(false);
      });
  };

  const handleInputChange = (value: string, setFieldValue: Formik.SetFieldValueFunc) => {
    setFieldValue('username', value);
    if (value.length >= 2) {
      handleSearch(value);
    }
  };

  const handleChange = (selectedOptions: Array<QueryUsernameSuggestionRecord>, setFieldValue: Formik.SetFieldValueFunc) => {
    selectedOptions && selectedOptions.length > 0 && setFieldValue('username', selectedOptions[0].username);
  };

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
            dispatch(getCustomerInformation(values.username, () => setSubmitting(false)));
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
                  inputProps={{
                    className: errors.username && touched.username ? 'is-invalid' : ''
                  }}
                  filterBy={() => true}
                  isLoading={isLoading}
                  options={options}
                  placeholder="Input an username"
                  labelKey="username"
                  onInputChange={(value) => handleInputChange(value, setFieldValue)}
                  onChange={(selectedOptions) => handleChange(selectedOptions, setFieldValue)}
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