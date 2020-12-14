// @ts-nocheck
import './SideBar.scss';
import React, { useState, createRef, useEffect, RefObject } from 'react';
import { Button, Form, Navbar, Spinner, FormFeedback } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import CustomerPage from './customer/Page';
import { queryUsernameSuggestion, getCustomerInformation } from './reducer';
import { useHistory } from 'react-router-dom';
import { Customer } from './customer/Model';
import { RootState } from '../../store';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Required')
    .min(2, 'At least 2 characters')
});

export interface SidebarState {
  customer?: Customer,
  message?: string,
  username?: string,
  isOpen: boolean
};

type DefaultFuntion = () => void;

type DefaultSetFuntion = (value: string, field: string) => void;

interface UsernameOption {
  username: string
}

interface CustomAsyncTypeAdead extends AsyncTypeahead<never> {
  clear: DefaultFuntion,
}

const SideBar = () => {
  const typeaheadRef: RefObject<CustomAsyncTypeAdead> = createRef();
  const formikRef: RefObject<FormikProps<{ username: string; }>> = createRef();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const { customer, message, username } = useSelector((state: RootState) => state.sidebar);
  const history = useHistory();

  useEffect(() => {
    if (!username) {
      return;
    }

    var { clear } = typeaheadRef.current ?? { clear: undefined };
    clear && clear();

    const { isSubmitting, handleSubmit } = formikRef.current ?? { isSubmitting: false, handleSubmit: undefined };
    if (!isSubmitting) {
      handleSubmit && handleSubmit();
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

  const handleInputChange = (value: string, setFieldValue: DefaultSetFuntion) => {
    setFieldValue('username', value);
    if (value.length >= 2) {
      handleSearch(value);
    }
  };

  const handleChange = (option: Array<any>, setFieldValue: DefaultSetFuntion) => {
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
          onSubmit={(values: UsernameOption, { setSubmitting }) => {
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
                  options={options}
                  placeholder="Input an username"
                  labelKey="username"
                  onInputChange={(value) => handleInputChange(value, setFieldValue)}
                  onChange={(option) => handleChange(option, setFieldValue)}
                  onSearch={(value) => handleSearch(value)}
                  renderMenuItemChildren={(option: UsernameOption) => <span>{option.username}</span>}
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
      {0 < customer?.generalInformation?.custId  && <CustomerPage></CustomerPage>}
    </div>
  );
}

export default SideBar;