import React, { useState, createRef, useEffect } from 'react';
import { Label, Form, Button, FormGroup, Container, Spinner, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Formik, FormikProps } from 'formik';
import FormikDatePicker from '../../../common/components/date-picker/FormikDatePicker';
import { formatDate, getToday, ReportDateRanges } from '../../../common/utils/DateUtils';
import { query, toggleMode, excel } from './reducer';
import Icon from '@mdi/react';
import { mdiFileExcelOutline } from '@mdi/js';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  minDate: moment.Moment;
  maxDate: moment.Moment;
}

const NormalFilter: React.FC<Props> = ({ minDate, maxDate }) => {
  const formikRef = createRef<FormikProps<any>>();
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownIndex, setDropdownIndex] = useState(0);
  const { customer, pageIndex, pageSize, isHistory } = useSelector((state: RootState) => state.winLossDetail);
  const { custId, roleId } = customer as Customer;

  useEffect(() => {
    const { isSubmitting, handleSubmit } = formikRef.current as FormikProps<any>;
    if (!isSubmitting) {
      handleSubmit();
    }
  }, [custId]);

  const handleDropdownItemClick = (index: number, setFieldValue: Formik.SetFieldValueFunc, handleSubmit: Func) => {
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
      innerRef={formikRef}
      initialValues={{
        fromDate: getToday(),
        toDate: getToday()
      }}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(query({
          isHistory,
          custId,
          roleId,
          pageIndex,
          pageSize,
          fromDate: formatDate(values['fromDate']),
          toDate: formatDate(values['toDate'])
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
                <FormikDatePicker disabled={isSubmitting} name="fromDate" minValue={minDate} maxValue={maxDate} onChange={onDateChange} />
              </FormGroup>
              <FormGroup className="mr-5">
                <Label className="mr-2">To</Label>
                <FormikDatePicker disabled={isSubmitting} name="toDate" minValue={minDate} maxValue={maxDate} onChange={onDateChange} />
              </FormGroup>
              <FormGroup className="mr-5">
                <Button type="submit" color="primary">
                  {isSubmitting && <Spinner className='mr-3' />}
                    Submit
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
              <FormGroup>
                <Button type='button' color='success' className='btn-excel' title='Export to Excel' onClick={() => {console.log(customer); dispatch(excel())}}>
                  <Icon path={mdiFileExcelOutline} />
                </Button>
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

export default NormalFilter;