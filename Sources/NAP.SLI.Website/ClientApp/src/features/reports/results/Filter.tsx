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
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Label,
} from 'reactstrap';
import { formatDate, maxDate, getYesterday, getToday } from 'utils/DateUtils';
import { query } from './reducer';

const sports = [
  {
    label: 'Number Game',
  },
  {
    label: 'Happy 5',
  },
];

const leagues = [
  {
    label: 'Show All Leagues',
  },
  {
    label: 'Number Game',
  },
];

type FilterValues = {
  date: string;
  sport: number;
  league: number;
};

const Filter = () => {
  const dispatch = useAppDispatch();
  const { minDate, queryArg } = useSelector((state: AppState) => state.results);
  const { date } = queryArg;
  const { control, setValue, getValues, handleSubmit } = useForm<FilterValues>({
    defaultValues: {
      date,
      sport: 0,
      league: 0,
    },
  });
  const [sportDropdownOpen, setSportDropdownOpen] = useState(false);
  const [leagueDropdownOpen, setLeagueDropdownOpen] = useState(false);

  useEffect(() => {
    dispatch(getBalanceUpDay());
  }, [dispatch]);

  console.log(getValues());

  const handleDateChange = (value: string | Moment) => {
    setValue('date', formatDate(value as Moment));
    console.log(getValues());
  };

  const handleExcel = () => {
    console.log('excel');
  };

  const handleQuery = (values: FilterValues) => {
    console.log('submit: ', values);
    dispatch(query(values));
  };

  const handleSportClick = (index: number) => {
    setValue('sport', index);
    handleSubmit(handleQuery)();
  };

  const handleLeagueClick = (index: number) => {
    setValue('league', index);
    handleSubmit(handleQuery)();
  };

  const handleDateButtonClick = (value: string) => {
    setValue('date', value);
    handleSubmit(handleQuery)();
  };

  const today = formatDate(getToday());
  const yesterday = formatDate(getYesterday());
  return (
    <Form onSubmit={handleSubmit(handleQuery)} className="mb-4">
      <Container fluid className="filter">
        <fieldset className="form-inline">
          <FormGroup className="mb-4">
            <Label className="mr-3">Date: </Label>
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <RHFDatePicker
                  {...field}
                  onChange={handleDateChange}
                  disabled={false}
                  minDate={moment(minDate)}
                  maxDate={maxDate}
                />
              )}
            />
          </FormGroup>
          <FormGroup className="ml-3 mb-4" type="submit">
            <Button color="primary">Submit</Button>
          </FormGroup>
          <FormGroup className="ml-3 mb-4">
            <Button
              color="primary"
              onClick={() => handleDateButtonClick(today)}
            >
              {today}
            </Button>
          </FormGroup>
          <FormGroup className="ml-3 mb-4">
            <Button
              color="primary"
              onClick={() => handleDateButtonClick(yesterday)}
            >
              {yesterday}
            </Button>
          </FormGroup>
          <FormGroup className="ml-3 mb-4">
            <Button
              type="button"
              color="success"
              className="btn-excel"
              title="Export to Excel"
              onClick={handleExcel}
              //   disabled={isLoading}
            >
              {/* {isLoading ? (
                <Spinner />
              ) : ( */}
              <Icon path={mdiFileExcelOutline} />
              {/* )} */}
            </Button>
          </FormGroup>
        </fieldset>
        <div>You can view the report data from 12/04/2019.</div>
      </Container>
      <div className="form-inline">
        <FormGroup>
          <Label className="mr-3">Sport</Label>
          <Dropdown
            isOpen={sportDropdownOpen}
            toggle={() => setSportDropdownOpen(!sportDropdownOpen)}
          >
            <DropdownToggle color="primary" caret>
              {sports[getValues('sport')].label}
            </DropdownToggle>
            <DropdownMenu>
              {sports.map((option, index) => (
                <DropdownItem
                  key={index}
                  onClick={() => handleSportClick(index)}
                >
                  {option.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </FormGroup>
        <FormGroup className="ml-5">
          <Label className="mr-3">League</Label>
          <Dropdown
            isOpen={leagueDropdownOpen}
            toggle={() => setLeagueDropdownOpen(!leagueDropdownOpen)}
          >
            <DropdownToggle color="primary" caret>
              {leagues[getValues('league')].label}
            </DropdownToggle>
            <DropdownMenu>
              {leagues.map((option, index) => (
                <DropdownItem
                  key={index}
                  onClick={() => handleLeagueClick(index)}
                >
                  {option.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </FormGroup>
      </div>
    </Form>
  );
};

export default Filter;
