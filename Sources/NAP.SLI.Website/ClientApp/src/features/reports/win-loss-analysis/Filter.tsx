import React, { useState } from 'react';
import { Label, Form, Button, FormGroup, Container, Spinner, Input, Row, Col, ButtonGroup, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Formik } from 'formik';
import FormikDatePicker from '../../../common/components/date-picker/FormikDatePicker';
import { getToday, formatDate, ReportDateRanges } from '../../../common/utils/DateUtils';
import { useDispatch } from 'react-redux';
import { query, WinLossAnalysisState } from './reducer';
import { Moment } from 'moment';

type FilterProp = {
  custId: number,
  roleId: number,
  username: string,
  reportType: number,
  minDate: Moment,
  maxDate: Moment
};

const Filter: React.FC<FilterProp> = (props) => {
  const dispatch = useDispatch();
  const { custId, roleId, minDate, maxDate } = props;
  const [reportType, setReportType] = useState(props.reportType);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownIndex, setDropdownIndex] = useState(0);

  const handleDropdownItemClick = (index: number, setFieldValue: any, handleSubmit: any) => {
    setDropdownIndex(index);
    const range = ReportDateRanges[index].getRange();
    if (range) {
      const { from, to } = range;
      setFieldValue('fromDate', from);
      setFieldValue('toDate', to);
      handleSubmit();
    }
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
          reportType,
          ...values
        } as WinLossAnalysisState, () => setSubmitting(false)));
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
                <FormikDatePicker disabled={isSubmitting} name="fromDate" minDate={minDate} maxDate={maxDate} />
              </FormGroup>
              <FormGroup className="mr-5">
                <Label className="mr-2">To</Label>
                <FormikDatePicker disabled={isSubmitting} name="toDate" minDate={minDate} maxDate={maxDate} />
              </FormGroup>
              <FormGroup className="mr-5">
                <Button type="submit" color="primary">
                  {isSubmitting && <Spinner className='mr-3' />} Submit
                                    </Button>
              </FormGroup>
              <FormGroup className="mr-5">
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
          <>
            You can view the report data from {formatDate(minDate)}.
          </>
          <Container fluid={true} className="my-2">
            <span>Report By</span>
            <ButtonGroup className="mx-4">
              <Button color="primary" onClick={() => setReportType(1)} active={reportType == 1}>Daily</Button>
              <Button color="primary" onClick={() => setReportType(2)} active={reportType == 2}>Monthly</Button>
              <Button color="primary" onClick={() => setReportType(3)} active={reportType == 3}>Sport</Button>
            </ButtonGroup>
          </Container>
        </Container>
      )}
    </Formik>
  );
}

export default Filter;