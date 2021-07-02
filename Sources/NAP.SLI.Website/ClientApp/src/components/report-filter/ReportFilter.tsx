import React, { useState, useEffect, ReactNode } from 'react';
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
  ReportDateRanges,
  stringDateToMoment,
} from 'utils/DateUtils';
import Icon from '@mdi/react';
import { mdiFileExcelOutline } from '@mdi/js';
import moment, { Moment } from 'moment';
import { Controller, useForm } from 'react-hook-form';
import RHFDatePicker from '../date-picker/RHFDatePicker';

type Props = {
  minDate: Moment;
  maxDate: Moment;
  fromDate: Moment;
  toDate: Moment;
  component?: ReactNode;
  onQuery: (fromDate: Moment, toDate: Moment) => Promise<void>;
  onExcel: () => Promise<void>;
};

const ReportFilter = ({
  minDate,
  maxDate,
  fromDate,
  toDate,
  component,
  onQuery,
  onExcel,
}: Props) => {
  const initialValues = {
    fromDate: formatDate(fromDate),
    toDate: formatDate(toDate),
  };
  type FilterValues = typeof initialValues;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownIndex, setDropdownIndex] = useState(0);
  const {
    getValues,
    setValue,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<FilterValues>({
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (!isSubmitting) {
      handleSubmit(onSubmit)();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDropdownItemClick = (index: number) => {
    setDropdownIndex(index);
    const range = ReportDateRanges[index].getRange();
    if (range) {
      const { from, to } = range;
      setValue('fromDate', formatDate(from));
      setValue('toDate', formatDate(to));
      handleSubmit(onSubmit)();
    }
  };

  const handleFromDateChange = (selectedDate: string | Moment) => {
    const selectedFromDate = moment(selectedDate);
    const { toDate } = getValues();
    if (selectedFromDate.isAfter(stringDateToMoment(toDate))) {
      setValue('toDate', formatDate(selectedFromDate));
    }

    setValue('fromDate', formatDate(selectedFromDate));
    setDropdownIndex(ReportDateRanges.length - 1);
  };

  const handleToDateChange = (selectedDate: string | Moment) => {
    const selectedToDate = moment(selectedDate);
    const { fromDate } = getValues();
    if (selectedToDate.isBefore(stringDateToMoment(fromDate))) {
      setValue('fromDate', formatDate(selectedToDate));
    }

    setValue('toDate', formatDate(selectedToDate));
    setDropdownIndex(ReportDateRanges.length - 1);
  };

  const onSubmit = async ({ fromDate, toDate }: FilterValues) => {
    await onQuery(stringDateToMoment(fromDate), stringDateToMoment(toDate));
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
                  minDate={minDate}
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
                {ReportDateRanges[dropdownIndex].label}
              </DropdownToggle>
              <DropdownMenu>
                {ReportDateRanges.map((option, index) => (
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
              onClick={onExcel}
            >
              <Icon path={mdiFileExcelOutline} />
            </Button>
          </FormGroup>
        </fieldset>
      </Form>
      {component}
    </>
  );
};

export default ReportFilter;
