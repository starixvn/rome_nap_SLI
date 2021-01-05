import React, { createRef, useEffect } from 'react';
import { Label, Form, Button, FormGroup, Container, Spinner } from 'reactstrap';
import { Formik, FormikProps } from 'formik';
import FormikMonthPicker from '../../../common/components/month-picker/FormikMonthPicker';
import { formatDate, getToday } from '../../../common/utils/DateUtils';
import { generateRangeSelectOptions } from '../../../common/utils/SelectUtils';
import FormikSelect from '../../../common/components/select/FormikSelect';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '@mdi/react';
import { mdiFileExcelOutline } from '@mdi/js';
import { query, toggleMode, excel } from './reducer';
import moment, { Moment } from 'moment';

const generateDateOptions = (date: Moment) => {
  return generateRangeSelectOptions(1, date.daysInMonth());
}

type Props = {
  minDate: Moment;
  maxDate: Moment;
}

const HistoryFilter: React.FC<Props> = ({ minDate, maxDate }) => {
  let formikRef = createRef<FormikProps<any>>();
  const dispatch = useDispatch();
  const { customer, pageIndex, pageSize, isHistory } = useSelector((state: RootState) => state.winLossDetail);

  if (!customer) {
    return <></>;
  }

  const { custId, roleId } = customer;

  const month = getToday();
  const dateOptions = generateDateOptions(month);
  const fromDateOption = dateOptions[0].value;
  const toDateOption = dateOptions[month.date() - 1].value;

  useEffect(() => {
    if (!formikRef.current) {
      return;
    }

    const { isSubmitting, handleSubmit } = formikRef.current;
    if (!isSubmitting) {
      handleSubmit();
    }
  }, [custId]);

  const handleMonthChange = (value: Moment, setFieldValue: Formik.SetFieldValueFunc) => {
    const dateOptions = generateDateOptions(value);
    setFieldValue('dateOptions', dateOptions);
    setFieldValue('fromDateOption', dateOptions[0].value);
    if (value.isSame(getToday())) {
      setFieldValue('toDateOption', dateOptions[value.date() - 1].value);
    } else {
      setFieldValue('toDateOption', dateOptions[dateOptions.length - 1].value);
    }
  }

  return (
    <Formik
      innerRef={formikRef}
      initialValues={{
        month,
        dateOptions,
        fromDateOption,
        toDateOption
      }}
      onSubmit={(values, { setSubmitting }) => {
        const month = values.month;
        const fromDate = moment(month).date(values.fromDateOption);
        const toDate = moment(month).date(values.toDateOption);
        dispatch(query({
          isHistory,
          custId,
          roleId,
          fromDate: formatDate(fromDate),
          toDate: formatDate(toDate),
          pageIndex,
          pageSize
        }, () => setSubmitting(false)));
      }}
    >
      {({
        values,
        setFieldValue,
        handleSubmit,
        isSubmitting
      }) => (
        <Container fluid className="filter">
          <Form inline className="mb-3" onSubmit={handleSubmit}>
            <fieldset disabled={isSubmitting} className="form-inline">
              <FormGroup className="mr-5">
                <Label className="mr-2">View data in month</Label>
                <FormikMonthPicker disabled={isSubmitting} name="month" minDate={minDate} maxDate={maxDate} onChange={value => handleMonthChange(moment(value), setFieldValue)} />
              </FormGroup>
              <FormGroup className="mr-5">
                <Label className="mr-2">From</Label>
                <FormikSelect name="fromDateOption" options={values.dateOptions} />
              </FormGroup>
              <FormGroup className="mr-5">
                <Label className="mr-2">To</Label>
                <FormikSelect name="toDateOption" options={values.dateOptions} />
              </FormGroup>
              <FormGroup className="mr-5">
                <Button type="submit" color="primary">
                  {isSubmitting && <Spinner className='mr-3' />}
                    Submit
                  </Button>
              </FormGroup>
              <FormGroup>
                <Button type='button' color='success' className='btn-excel' title='Export to Excel' onClick={() => dispatch(excel())}>
                  <Icon path={mdiFileExcelOutline} />
                </Button>
              </FormGroup>
            </fieldset>
          </Form>
          <div>
            You can view the report data from 09/01/2019. <span className="text-link" onClick={() => dispatch(toggleMode())}>Back To Current Report</span>
          </div>
        </Container>
      )}
    </Formik>
  );
}

export default HistoryFilter;