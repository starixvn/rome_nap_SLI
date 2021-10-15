import React, { useState, useEffect, ReactNode, useMemo } from 'react';
import {
  Label,
  Form,
  Button,
  FormGroup,
  Spinner,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import {
  formatDate,
  getToday,
  ReportDateRanges,
  stringDateToMoment,
} from 'utils/DateUtils';
import Icon from '@mdi/react';
import { mdiFileExcelOutline } from '@mdi/js';
import moment, { Moment } from 'moment';
import { Controller, useForm } from 'react-hook-form';
import RHFDatePicker from '../date-picker/RHFDatePicker';
import { useAppDispatch } from 'app/store';
import { getMinDate } from './reducer';
import { useSelector } from 'react-redux';

type Props = {
  maxDate: Moment;
  fromDate: Moment;
  toDate: Moment;
  component?: ReactNode;
  customKey?: number;
  onQuery: (fromDate: Moment, toDate: Moment) => Promise<void>;
  onExcel: () => Promise<void>;
};

const getReportDateRanges = (minDate: string) => {
  return minDate !== ''
    ? ReportDateRanges.filter(
        (el) =>
          el.getRange()?.from.isAfter(moment(minDate)) ||
          el.label === 'Specific Dates',
      )
    : ReportDateRanges;
};

const ReportFilter = ({
  maxDate,
  fromDate,
  toDate,
  component,
  customKey = 0,
  onQuery,
  onExcel,
}: Props) => {
  const initialValues = {
    fromDate: formatDate(fromDate),
    toDate: formatDate(toDate),
  };
  type FilterValues = typeof initialValues;

  const dispatch = useAppDispatch();
  const { minDate } = useSelector((state: AppState) => state.reportFilter);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownIndex, setDropdownIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const {
    getValues,
    setValue,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<FilterValues>({
    defaultValues: initialValues,
  });

  const reportDateRanges = useMemo(() => getReportDateRanges(minDate), [
    minDate,
  ]);

  useEffect(() => {
    if (!isSubmitting) {
      handleSubmit(onSubmit)();
      dispatch(getMinDate());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customKey]);

  const handleDropdownItemClick = (index: number) => {
    setDropdownIndex(index);
    const range = reportDateRanges[index].getRange();
    if (range) {
      const { from, to } = range;
      setValue('fromDate', formatDate(from));
      setValue('toDate', formatDate(to));
    }
  };

  const handleFromDateChange = (selectedDate: string | Moment) => {
    const selectedFromDate = moment(selectedDate);
    const { toDate } = getValues();
    if (selectedFromDate.isAfter(stringDateToMoment(toDate))) {
      setValue('toDate', formatDate(selectedFromDate));
    }

    setValue('fromDate', formatDate(selectedFromDate));
    setDropdownIndex(reportDateRanges.length - 1);
  };

  const handleToDateChange = (selectedDate: string | Moment) => {
    const selectedToDate = moment(selectedDate);
    const { fromDate } = getValues();
    if (selectedToDate.isBefore(stringDateToMoment(fromDate))) {
      setValue('fromDate', formatDate(selectedToDate));
    }

    setValue('toDate', formatDate(selectedToDate));
    setDropdownIndex(reportDateRanges.length - 1);
  };

  const onSubmit = async ({ fromDate, toDate }: FilterValues) => {
    await onQuery(stringDateToMoment(fromDate), stringDateToMoment(toDate));
  };

  const handleExcel = async () => {
    setIsLoading(true);
    await onExcel();
    setIsLoading(false);
  };

  return (
    <>
      <Form inline className="mb-3" onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={isSubmitting} className="form-inline">
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
          <FormGroup className="mr-5">
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
          <FormGroup className="mr-5">
            <Button type="submit" color="primary">
              {isSubmitting && (
                <Spinner data-testid="loading" className="mr-3" />
              )}
              Submit
            </Button>
          </FormGroup>
          <FormGroup className="mr-5">
            <Dropdown
              isOpen={dropdownOpen}
              toggle={() => setDropdownOpen(!dropdownOpen)}
            >
              <DropdownToggle color="primary" caret>
                {reportDateRanges[dropdownIndex].label}
              </DropdownToggle>
              <DropdownMenu>
                {reportDateRanges.map((option, index) => (
                  <DropdownItem
                    key={index}
                    onClick={() => handleDropdownItemClick(index)}
                  >
                    {option.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </FormGroup>
          <FormGroup>
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
      {component}
    </>
  );
};

export default ReportFilter;
