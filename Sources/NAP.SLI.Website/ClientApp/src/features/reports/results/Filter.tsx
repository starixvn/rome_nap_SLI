import { mdiFileExcelOutline } from '@mdi/js';
import Icon from '@mdi/react';
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
  getDate,
  getToday,
  getYesterday,
  maxDate,
} from 'utils/DateUtils';
import { SHOW_ALL_LEAGUES } from 'utils/ConstantUtils';
import {
  queryLeaguesAndResults,
  querySubmit,
  queryExcel,
  queryResult,
} from './reducer';

type FilterValues = {
  eventDate: string;
  sportType: number;
  leagueId: number;
};

// eslint-disable-next-line sonarjs/cognitive-complexity
const Filter = () => {
  const today = formatDate(getToday());
  const yesterday = formatDate(getYesterday());

  const dispatch = useAppDispatch();
  const {
    sports,
    leagues,
    isSportLoading,
    isLeagueLoading,
    isExcelLoading,
  } = useSelector((state: AppState) => state.results);
  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FilterValues>({
    defaultValues: {
      eventDate: today,
      sportType: 0,
      leagueId: 0,
    },
  });
  const [sportDropdownOpen, setSportDropdownOpen] = useState(false);
  const [leagueDropdownOpen, setLeagueDropdownOpen] = useState(false);
  const [selectedSportName, setSelectedSportName] = useState<string>('');
  const [selectedLeagueName, setSelectedLeagueName] = useState<string>('');

  const handleQuery = useCallback(
    async ({ eventDate }: FilterValues) => {
      await dispatch(querySubmit({ eventDate }));
    },
    [dispatch],
  );

  useEffect(() => {
    if (sports.length > 0) {
      setValue('sportType', sports[0].sportType);
      setSelectedSportName(sports[0].sportName);
    } else {
      setValue('sportType', 0);
      setValue('leagueId', 0);
    }
  }, [setValue, sports]);

  useEffect(() => {
    if (leagues.length > 0) {
      setValue('leagueId', 0);
      setSelectedLeagueName(SHOW_ALL_LEAGUES);
    } else {
      setValue('sportType', 0);
      setValue('leagueId', 0);
    }
  }, [setValue, leagues]);

  useEffect(() => {
    handleSubmit(handleQuery)();
  }, [handleQuery, handleSubmit]);

  const handleSportClick = async (sportType: number) => {
    const selectedSport = sports.find((sport) => sport.sportType === sportType);
    setSelectedSportName(selectedSport?.sportName ?? '');
    setValue('sportType', sportType);

    await dispatch(
      queryLeaguesAndResults({
        eventDate: getValues('eventDate'),
        sportType,
      }),
    );
  };

  const handleLeagueClick = async (leagueId: number) => {
    const selectedLeague = leagues.find(
      (league) => league.leagueId === leagueId,
    );
    setSelectedLeagueName(selectedLeague?.leagueName ?? SHOW_ALL_LEAGUES);
    setValue('leagueId', leagueId);

    await dispatch(
      queryResult({
        eventDate: getValues('eventDate'),
        leagueId,
        sportType: getValues('sportType'),
      }),
    );
  };

  const handleDateButtonClick = (value: string) => {
    setValue('eventDate', value);
    handleSubmit(handleQuery)();
  };

  const handleExcel = async () => {
    await dispatch(
      queryExcel({
        eventDate: getValues('eventDate'),
        leagueId: getValues('leagueId'),
        sportType: getValues('sportType'),
        leagueName: selectedLeagueName,
        sportName: selectedSportName,
      }),
    );
  };

  const handleDateChange = (value: string | Moment) => {
    setValue('eventDate', formatDate(value as Moment));
  };

  return (
    <Container fluid className="filter">
      <Form onSubmit={handleSubmit(handleQuery)}>
        <fieldset
          className="form-inline mb-3"
          disabled={isSubmitting || isSportLoading || isLeagueLoading}
        >
          <FormGroup className="mr-5">
            <Label className="mr-2">Date</Label>
            <Controller
              control={control}
              name="eventDate"
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
          <FormGroup className="mr-3" type="submit">
            <Button color="primary">
              {isSubmitting && <Spinner className="mr-3" />}
              Submit
            </Button>
          </FormGroup>
          <FormGroup className="mr-3">
            <Button
              color="primary"
              onClick={() => handleDateButtonClick(today)}
            >
              {today}
            </Button>
          </FormGroup>
          <FormGroup className="mr-5">
            <Button
              color="primary"
              onClick={() => handleDateButtonClick(yesterday)}
            >
              {yesterday}
            </Button>
          </FormGroup>
          {getValues('sportType') !== 0 && (
            <FormGroup>
              <Button
                type="button"
                color="success"
                className="btn-excel"
                title="Export to Excel"
                onClick={handleExcel}
                disabled={isExcelLoading}
              >
                {isExcelLoading ? (
                  <Spinner />
                ) : (
                  <Icon path={mdiFileExcelOutline} />
                )}
              </Button>
            </FormGroup>
          )}
        </fieldset>
        <div>
          You can view the report data from{' '}
          {getDate(window.configuration.balanceUpDay)}.
        </div>
        {sports.length > 0 && leagues.length > 0 && (
          <fieldset disabled={isSubmitting} className="form-inline mt-3">
            <FormGroup className="mr-5">
              <Label className="mr-2">Sport</Label>
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
            <FormGroup>
              <Label className="mr-2">League</Label>
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
          </fieldset>
        )}
      </Form>
    </Container>
  );
};

export default Filter;
