import { createAsyncThunk, createSlice, unwrapResult } from '@reduxjs/toolkit';
import { download, post } from 'services/http';
import { SHOW_ALL_LEAGUES } from 'utils/ConstantUtils';
import {
  ExcelArg,
  League,
  LeagueArg,
  QueryLeaguesAndResultsArg,
  QueryLeaguesAndResultsResponse,
  QuerySubmitArg,
  QuerySubmitResponse,
  ResultArg,
  Record,
  Soccer5Arg,
  Sport,
  SportArg,
  State,
} from './types';

const actionName = 'result';

const initialState: State = {
  sports: [],
  leagues: [],
  records: [],
  selectedSportType: 0,
  isSportLoading: false,
  isLeagueLoading: false,
  isResultLoading: false,
  isSoccer5Loading: false,
  isExcelLoading: false,
};

const querySports = createAsyncThunk<Sport[], SportArg>(
  `${actionName}/getSports`,
  async (values) => {
    const { data } = await post<Sport[]>(
      `/api/${actionName}/getSports`,
      values,
    );
    return data;
  },
);

const queryLeagues = createAsyncThunk<League[], LeagueArg>(
  `${actionName}/getLeagues`,
  async (values) => {
    const { data } = await post<League[]>(
      `/api/${actionName}/getLeagues`,
      values,
    );
    const allItem: League = {
      leagueId: 0,
      leagueName: SHOW_ALL_LEAGUES,
    };
    return [allItem].concat(data);
  },
);

export const queryResultsByDate = createAsyncThunk<Record[], ResultArg>(
  `${actionName}/queryResultsByDate`,
  async (values) => {
    const { data } = await post<Record[]>(
      `/api/${actionName}/getResultsByDate`,
      values,
    );
    return data;
  },
);

export const queryResults = createAsyncThunk<
  QuerySubmitResponse,
  QuerySubmitArg
>(`${actionName}/queryResults`, async ({ eventDate }, { dispatch }) => {
  const sports = await dispatch(querySports({ eventDate })).then(unwrapResult);
  if (sports.length === 0) return { sports: [], leagues: [], results: [] };

  const leagues = await dispatch(
    queryLeagues({
      eventDate,
      sportType: sports[0].sportType,
    }),
  ).then(unwrapResult);

  const results = await dispatch(
    queryResultsByDate({
      eventDate,
      sportType: sports[0].sportType,
      leagueId: leagues[0].leagueId,
    }),
  ).then(unwrapResult);

  return {
    sports,
    leagues,
    results,
  };
});

export const queryLeaguesAndResults = createAsyncThunk<
  QueryLeaguesAndResultsResponse,
  QueryLeaguesAndResultsArg
>(
  `${actionName}/getLeaguesAndResults`,
  async ({ eventDate, sportType }, { dispatch }) => {
    const leagues = await dispatch(queryLeagues({ eventDate, sportType })).then(
      unwrapResult,
    );

    const results = await dispatch(
      queryResultsByDate({
        eventDate,
        sportType,
        leagueId: leagues[0].leagueId,
      }),
    ).then(unwrapResult);

    return {
      leagues,
      results,
    };
  },
);

export const queryExcel = createAsyncThunk<void, ExcelArg>(
  `${actionName}/getExcel`,
  async (values) => {
    await download(`/api/${actionName}/excel`, values);
  },
);

export const querySoccer5 = createAsyncThunk<string, Soccer5Arg>(
  'third-party-result/getSoccer5Result',
  async (values) => {
    const { data } = await post<string>(
      'api/third-party-result/getSoccer5Result',
      values,
    );
    return data;
  },
);

export const queryNumberGame = createAsyncThunk<string, Soccer5Arg>(
  'third-party-result/getSoccer5Result',
  async (values) => {
    const { data } = await post<string>('api/result/getResultByMatch', values);
    return data;
  },
);

const slice = createSlice({
  name: actionName,
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(querySports.pending, (state) => {
      state.isSportLoading = true;
      state.records = [];
    });
    builder.addCase(querySports.fulfilled, (state, { payload }) => {
      state.isSportLoading = false;
      state.sports = payload;
      state.selectedSportType = payload[0]?.sportType ?? 0;
    });

    builder.addCase(queryLeagues.pending, (state, { meta }) => {
      state.isLeagueLoading = true;
      state.selectedSportType = meta.arg.sportType;
      state.records = [];
    });
    builder.addCase(queryLeagues.fulfilled, (state, { payload }) => {
      state.isLeagueLoading = false;
      state.leagues = payload;
    });

    builder.addCase(queryResultsByDate.pending, (state) => {
      state.isResultLoading = true;
      state.records = [];
    });
    builder.addCase(queryResultsByDate.fulfilled, (state, { payload }) => {
      state.isResultLoading = false;
      state.records = payload;
    });

    builder.addCase(queryLeaguesAndResults.fulfilled, (state, { payload }) => {
      state.leagues = payload.leagues;
      state.records = payload.results;
    });
    builder.addCase(queryResults.fulfilled, (state, { payload }) => {
      state.sports = payload.sports;
      state.leagues = payload.leagues;
      state.records = payload.results;
    });

    builder.addCase(queryExcel.pending, (state) => {
      state.isExcelLoading = true;
    });
    builder.addCase(queryExcel.fulfilled, (state) => {
      state.isExcelLoading = false;
    });

    builder.addCase(querySoccer5.pending, (state) => {
      state.isSoccer5Loading = true;
    });
    builder.addCase(querySoccer5.fulfilled, (state) => {
      state.isSoccer5Loading = false;
    });
  },
});

export const { reset } = slice.actions;

export default slice.reducer;
