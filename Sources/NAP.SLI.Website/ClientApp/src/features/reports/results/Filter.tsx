import { mdiFileExcelOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch } from 'app/store';
import RHFDatePicker from 'components/date-picker/RHFDatePicker';
import moment, { Moment } from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
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
  Spinner,
} from 'reactstrap';
import {
  formatDate,
  maxDate,
  getYesterday,
  getToday,
  getDate,
} from 'utils/DateUtils';
import {
  queryLeagueByDate,
  queryNumberGameByLeague,
  querySportByDate,
} from './reducer';

import { SHOW_ALL_LEAGUES } from '../../../utils/ConstantUtils';

type FilterValues = {
  fromDate: string;
  sportId: number;
  leagueId: number;
};

// eslint-disable-next-line sonarjs/cognitive-complexity
const Filter = () => {
  const today = formatDate(getToday());
  const yesterday = formatDate(getYesterday());

  const dispatch = useAppDispatch();
  const { sports, leagues, isSportLoading, isLeagueLoading } = useSelector(
    (state: AppState) => state.results,
  );
  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FilterValues>({
    defaultValues: {
      fromDate: today,
      sportId: 0,
      leagueId: 0,
    },
  });
  const [sportDropdownOpen, setSportDropdownOpen] = useState(false);
  const [leagueDropdownOpen, setLeagueDropdownOpen] = useState(false);
  const [selectedSportName, setSelectedSportName] = useState<string>('');
  const [selectedLeagueName, setSelectedLeagueName] = useState<string>('');

  const querySport = useCallback(
    async (fromDate: string) => {
      const results = await dispatch(
        querySportByDate({
          fromDate,
        }),
      );
      const sportsRes = unwrapResult(results);

      if (sportsRes.length === 0) return [];

      setValue('sportId', sportsRes[0].sportType);
      setSelectedSportName(sportsRes[0].sportName);

      return sportsRes;
    },
    [dispatch, setValue],
  );

  const queryLeague = useCallback(
    async (fromDate: string, sportId: number) => {
      const results = await dispatch(
        queryLeagueByDate({
          fromDate,
          sportId,
        }),
      );
      const leagueRes = unwrapResult(results);

      if (leagueRes.length === 0) return [];

      setValue('leagueId', 0);
      setSelectedLeagueName(SHOW_ALL_LEAGUES);

      return leagueRes;
    },
    [dispatch, setValue],
  );

  const queryNumberGame = useCallback(
    async (fromDate: string, leagueId: number, sportType: number) => {
      await dispatch(
        queryNumberGameByLeague({ fromDate, leagueId, sportType }),
      );
    },
    [dispatch],
  );

  const handleQuery = useCallback(
    async ({ fromDate }: FilterValues) => {
      const sportsResult = await querySport(fromDate);
      if (sportsResult.length === 0) return;

      const leagueResult = await queryLeague(
        fromDate,
        sportsResult[0].sportType,
      );
      if (leagueResult.length === 0) return;

      await queryNumberGame(
        fromDate,
        getValues('leagueId'),
        sportsResult[0].sportType,
      );
    },
    [getValues, queryLeague, queryNumberGame, querySport],
  );

  const handleSportClick = async (sportId: number) => {
    const selectedSport = sports.find((sport) => sport.sportType === sportId);
    setSelectedSportName(selectedSport?.sportName ?? '');
    setValue('sportId', sportId);

    const leagueResult = await queryLeague(getValues('fromDate'), sportId);
    if (leagueResult.length === 0) return;
    await queryNumberGame(
      getValues('fromDate'),
      getValues('leagueId'),
      sportId,
    );
  };

  const handleLeagueClick = async (leagueId: number) => {
    const selectedLeague = leagues.find(
      (league) => league.leagueId === leagueId,
    );
    setSelectedLeagueName(selectedLeague?.leagueName ?? SHOW_ALL_LEAGUES);
    setValue('leagueId', leagueId);

    await queryNumberGame(
      getValues('fromDate'),
      leagueId,
      getValues('sportId'),
    );
  };

  const handleDateButtonClick = (value: string) => {
    setValue('fromDate', value);
    handleSubmit(handleQuery)();
  };

  const handleExcel = () => {
    console.log('excel');
  };

  const handleDateChange = (value: string | Moment) => {
    setValue('fromDate', formatDate(value as Moment));
  };

  useEffect(() => {
    handleSubmit(handleQuery)();
  }, [dispatch, handleQuery, handleSubmit]);

  return (
    <Form onSubmit={handleSubmit(handleQuery)} className="mb-4">
      <fieldset disabled={isSubmitting}>
        <Container fluid className="filter">
          <div className="form-inline">
            <FormGroup className="mb-4">
              <Label className="mr-3">Date: </Label>
              <Controller
                control={control}
                name="fromDate"
                render={({ field }) => (
                  <RHFDatePicker
                    {...field}
                    onChange={handleDateChange}
                    disabled={isSubmitting}
                    minDate={moment(window.configuration.balanceUpDay)}
                    maxDate={maxDate}
                  />
                )}
              />
            </FormGroup>
            <FormGroup className="ml-3 mb-4" type="submit">
              <Button color="primary">
                {isSubmitting && <Spinner className="mr-3" />}
                Submit
              </Button>
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
          </div>
          <div>
            You can view the report data from{' '}
            {getDate(window.configuration.balanceUpDay)}.
          </div>
        </Container>
        {sports.length > 0 && leagues.length > 0 ? (
          <div className="form-inline">
            <FormGroup>
              <Label className="mr-3">Sport</Label>
              <Dropdown
                isOpen={sportDropdownOpen}
                toggle={() => setSportDropdownOpen(!sportDropdownOpen)}
              >
                <DropdownToggle color="primary" caret>
                  {isSportLoading ? (
                    <Spinner color="light" />
                  ) : (
                    selectedSportName
                  )}
                </DropdownToggle>
                <DropdownMenu>
                  {sports?.map((sport) => (
                    <DropdownItem
                      key={sport.sportType}
                      onClick={() => handleSportClick(sport.sportType)}
                    >
                      {sport.sportName}
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
                  {isLeagueLoading ? (
                    <Spinner color="light" />
                  ) : (
                    selectedLeagueName
                  )}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => handleLeagueClick(0)}>
                    {SHOW_ALL_LEAGUES}
                  </DropdownItem>
                  {leagues?.map((league) => (
                    <DropdownItem
                      key={league.leagueId}
                      onClick={() => handleLeagueClick(league.leagueId)}
                    >
                      {league.leagueName}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </FormGroup>
          </div>
        ) : null}
      </fieldset>
    </Form>
  );
};

export default Filter;
