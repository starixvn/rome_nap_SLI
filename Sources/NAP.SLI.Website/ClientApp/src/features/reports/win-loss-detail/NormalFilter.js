import React, { useState } from 'react';
import { Label, Form, Button, FormGroup, Container, Spinner, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import FormikDatePicker from '../../../common/components/date-picker/FormikDatePicker';
import { formatDate, getToday, getYesterday, ReportDateRanges } from '../../../common/utils/DateUtils';
import { query, toggleMode } from './reducer';
import { useDispatch } from 'react-redux';

const today = getToday();
const yesterday = getYesterday();

const propTypes = {
  custId: PropTypes.number.isRequired,
  roleId: PropTypes.number.isRequired,
  minDate: PropTypes.object.isRequired,
  maxDate: PropTypes.object.isRequired
};

const NormalFilter = (props) => {
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownIndex, setDropdownIndex] = useState(0);
  const { custId, roleId, minDate, maxDate } = props;

  const handleDropdownItemClick = (index, setFieldValue, handleSubmit) => {
    setDropdownIndex(index);
    const range = ReportDateRanges[index].getRange();
    if (range) {
      const { from, to } = range;
      setFieldValue('fromDate', from);
      setFieldValue('toDate', to);
      handleSubmit();
    }
  }

  const onDateChange = () => {
    setDropdownIndex(ReportDateRanges.length - 1);
  }

  return (
    <Formik
      initialValues={{
        fromDate: getToday(),
        toDate: getToday()
      }}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(query({
          custId,
          roleId,
          ...values
        }, () => setSubmitting(false)));
      }}
    >
      {({
        handleSubmit,
        isSubmitting,
        setFieldValue
      }) => (
          <Container fluid className="filter">
            <Form inline className="mb-3" onSubmit={handleSubmit}>
              <fieldset disabled={isSubmitting} className="form-inline">
                <FormGroup className="mr-5">
                  <Label className="mr-2">From</Label>
                  <FormikDatePicker name="fromDate" minValue={minDate} maxValue={maxDate} onChange={onDateChange} />
                </FormGroup>
                <FormGroup className="mr-5">
                  <Label className="mr-2">To</Label>
                  <FormikDatePicker name="toDate" minValue={minDate} maxValue={maxDate} onChange={onDateChange} />
                </FormGroup>
                <FormGroup className="mr-5">
                  <Button type="submit" color="primary">
                    {isSubmitting && <Spinner className='mr-3' />}
                    Submit
                  </Button>
                </FormGroup>
                <FormGroup>
                  <Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)}>
                    <DropdownToggle color="primary" caret>
                      {ReportDateRanges[dropdownIndex].label}
                    </DropdownToggle>
                    <DropdownMenu>
                      {ReportDateRanges.map((option, index) =>
                        <DropdownItem key={index} onClick={() => handleDropdownItemClick(index, setFieldValue, handleSubmit)}>
                          {option.label}
                        </DropdownItem>
                      )}
                    </DropdownMenu>
                  </Dropdown>
                </FormGroup>
              </fieldset>
            </Form>
            <div>
              You can view the report data from 09/01/2019. For more historic data, please click to <span className="text-link" onClick={() => dispatch(toggleMode())}>View History Report</span>
            </div>
          </Container>
        )}
    </Formik>
  );
}

NormalFilter.propTypes = propTypes;
export default NormalFilter;