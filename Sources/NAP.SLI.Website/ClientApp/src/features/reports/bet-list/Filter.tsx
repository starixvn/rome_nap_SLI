import { mdiFileExcelOutline } from '@mdi/js';
import Icon from '@mdi/react';
import RHFDatePicker from 'components/date-picker/RHFDatePicker';
import moment, { Moment } from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Spinner,
} from 'reactstrap';
import {
  formatDate,
  getToday,
  maxDate,
  stringDateToMoment,
} from 'utils/DateUtils';
import { useCustomerParams } from 'features/reports';
import * as dateService from './date/service';
import * as refNoService from './ref-no/service';
import { QueryData } from './types';

type Props = {
  setData: (data: QueryData | undefined) => void;
};

type Option = 'refNo' | 'date';

type FilterValues = {
  refNo: string;
  fromDate: string;
  toDate: string;
  option: Option;
};

const Filter = ({ setData }: Props) => {
  const { custId, username } = useCustomerParams();
  const minDate = moment(window.configuration.balanceUpDay);
  const today = getToday();
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
      refNo: '',
      fromDate: formatDate(today),
      toDate: formatDate(today),
      option: 'date',
    },
  });

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

  const handleQuery = useCallback(async () => {
    const { fromDate, toDate, option, refNo } = getValues();
    setData(undefined);
    const data =
      option === 'date'
        ? await dateService.query({
            custId,
            fromDate,
            toDate,
          })
        : await refNoService.query({
            custId,
            refNo: parseInt(refNo),
          });
    setData(data);
  }, [custId, getValues, setData]);

  const handleExcel = async () => {
    setIsLoading(true);
    const { fromDate, toDate, option, refNo } = getValues();
    option === 'date'
      ? await dateService.excel({
          custId,
          username,
          fromDate,
          toDate,
        })
      : await refNoService.excel({
          custId,
          username,
          refNo: parseInt(refNo),
        });
    setIsLoading(false);
  };

  const handleReset = async () => {
    reset();
    await handleQuery();
  };

  useEffect(() => {
    handleQuery();
  }, [handleQuery]);

  return (
    <Container fluid className="filter">
      <Form inline onSubmit={handleSubmit(handleQuery)}>
        <fieldset disabled={isSubmitting}>
          {/* <FormGroup inline className="mb-3">
            <Label check className="mr-5">
              <input
                type="radio"
                {...register('option')}
                value="refNo"
                className="mr-2"
              />
              By Ref No
            </Label>
            <Controller
              control={control}
              name="refNo"
              render={({ field }) => <Input type="text" {...field} />}
            />
          </FormGroup> */}
          <FormGroup inline className="mb-3">
            <Label check className="mr-5">
              <input
                type="radio"
                {...register('option')}
                value="date"
                className="mr-2"
              />
              Advance (Event Date)
            </Label>
            <FormGroup className="mr-5">
              <Label className="mr-2">From</Label>
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
            <FormGroup>
              <Label className="mr-2">To</Label>
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
            <Button type="submit" color="primary" className="mr-3">
              {isSubmitting && (
                <Spinner data-testid="loading" className="mr-3" />
              )}
              Submit
            </Button>
            <Button color="primary" className="mr-3" onClick={handleReset}>
              Reset
            </Button>
            <Button
              type="button"
              color="success"
              className="btn-excel"
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
