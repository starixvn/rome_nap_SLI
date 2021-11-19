import { mdiFileExcelOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { useAppDispatch } from 'app/store';
import RHFDatePicker from 'components/date-picker/RHFDatePicker';
import { getBalanceUpDay } from 'components/report-filter/reducer';
import moment, { Moment } from 'moment';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Spinner,
} from 'reactstrap';
import { formatDate, stringDateToMoment } from 'utils/DateUtils';
import { excel, getByDate } from './reducer';

type Props = {
  maxDate: Moment;
};

type RadioBtn = 'refno' | 'eventdate';

type FilterValues = {
  refno: string;
  fromDate: string;
  toDate: string;
  radio: RadioBtn;
};

const Filter = ({ maxDate }: Props) => {
  const dispatch = useAppDispatch();
  const { queryArg, queryCustomer, minDate } = useSelector(
    (state: AppState) => state.betList,
  );
  const { fromDate, toDate } = queryArg;

  const [isLoading, setIsLoading] = useState(false);
  const {
    setValue,
    getValues,
    register,
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<FilterValues>({
    defaultValues: {
      refno: '',
      fromDate,
      toDate,
      radio: 'refno',
    },
  });

  useEffect(() => {
    if (!isSubmitting && queryCustomer?.custId) {
      const { custId } = queryCustomer;
      handleSubmit(() => dispatch(getByDate({ fromDate, toDate, custId })))();
      dispatch(getBalanceUpDay());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryCustomer?.custId]);

  if (!queryCustomer) return <></>;
  const { custId, roleId, username } = queryCustomer;

  const handleFromDateChange = (selectedDate: string | Moment) => {
    const selectedFromDate = moment(selectedDate);
    const { toDate } = getValues();
    if (selectedFromDate.isAfter(stringDateToMoment(toDate))) {
      setValue('toDate', formatDate(selectedFromDate));
    }

    setValue('fromDate', formatDate(selectedFromDate));
  };

  const handleToDateChange = (selectedDate: string | Moment) => {
    const selectedToDate = moment(selectedDate);
    const { fromDate } = getValues();
    if (selectedToDate.isBefore(stringDateToMoment(fromDate))) {
      setValue('fromDate', formatDate(selectedToDate));
    }

    setValue('toDate', formatDate(selectedToDate));
  };

  const handleQuery = async (values: FilterValues) => {
    const { fromDate, toDate } = values;
    const queryPayload = {
      custId,
      fromDate,
      toDate,
    };
    await dispatch(getByDate(queryPayload));
  };

  const handleExcel = async () => {
    const excelPayload = {
      custId,
      roleId,
      username,
      fromDate,
      toDate,
    };
    setIsLoading(true);
    await excel(excelPayload);
    setIsLoading(false);
  };

  return (
    <Container fluid className="filter">
      <Form onSubmit={handleSubmit(handleQuery)}>
        <fieldset disabled={isSubmitting}>
          <FormGroup className="form-inline mb-4">
            <Label check>
              <input
                type="radio"
                {...register('radio')}
                value="refno"
                className="mr-2"
              />
              By Ref No:{' '}
              <Controller
                control={control}
                name="refno"
                render={({ field }) => (
                  <Input className="ml-3" type="text" {...field} />
                )}
              />
            </Label>
          </FormGroup>
          <FormGroup className="form-inline mb-4">
            <Label check>
              <input
                type="radio"
                {...register('radio')}
                value="eventdate"
                className="mr-2"
              />
              Advance (Event Date):
            </Label>
            <FormGroup className="ml-3">
              <Label className="mr-3">From</Label>
              <Controller
                control={control}
                name="fromDate"
                render={({ field }) => (
                  <RHFDatePicker
                    {...field}
                    onChange={(value) => handleFromDateChange(value)}
                    minDate={moment(minDate)}
                    maxDate={maxDate}
                    disabled={isSubmitting}
                  />
                )}
              />
            </FormGroup>
            <FormGroup className="ml-3">
              <Label className="mr-3">To</Label>
              <Controller
                control={control}
                name="toDate"
                render={({ field }) => (
                  <RHFDatePicker
                    {...field}
                    onChange={(value) => handleToDateChange(value)}
                    minDate={moment(minDate)}
                    maxDate={maxDate}
                    disabled={isSubmitting}
                  />
                )}
              />
            </FormGroup>
          </FormGroup>
          <FormGroup className="mr-5">
            <Button type="submit" color="primary">
              {isSubmitting && (
                <Spinner data-testid="loading" className="mr-3" />
              )}
              Submit
            </Button>
            <Button color="primary" className="ml-4" onClick={() => reset()}>
              Reset
            </Button>
            <Button
              type="button"
              color="success"
              className="btn-excel ml-4"
              title="Export to Excel"
              onClick={handleExcel}
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner data-testid="excel-loading" />
              ) : (
                <Icon path={mdiFileExcelOutline} />
              )}
            </Button>
          </FormGroup>
        </fieldset>
      </Form>
    </Container>
  );
};

export default Filter;
