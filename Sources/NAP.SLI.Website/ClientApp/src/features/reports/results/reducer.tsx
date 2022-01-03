import { createAsyncThunk, createSlice, unwrapResult } from '@reduxjs/toolkit';
import { download, post } from 'services/http';
import {
  ExcelArg,
  League,
  LeagueArg,
  QueryLeaguesAndResultsArg,
  QueryLeaguesAndResultsResponse,
  QuerySubmitArg,
  QuerySubmitResponse,
  ResultArg,
  ResultRecord,
  Soccer5Arg,
  Sport,
  SportArg,
  State,
} from './types';

const actionName = 'result';

const initialState: State = {
  sports: [],
  leagues: [],
  results: [],
  selectedSportType: 0,
  isSportLoading: false,
  isLeagueLoading: false,
  isResultLoading: false,
  isSoccer5Loading: false,
  isExcelLoading: false,
};

const querySportByDate = createAsyncThunk<Sport[], SportArg>(
  `${actionName}/getResultSportByDate`,
  async (values) => {
    const { data } = await post<Sport[]>(
      `/api/${actionName}/getResultSportByDate`,
      values,
    );
    return data;
  },
);

const queryLeagueByDate = createAsyncThunk<League[], LeagueArg>(
  `${actionName}/getResultLeagueByDate`,
  async (values) => {
    const { data } = await post<League[]>(
      `/api/${actionName}/getResultLeagueByDate`,
      values,
    );
    return data;
  },
);

export const queryResult = createAsyncThunk<ResultRecord[], ResultArg>(
  `${actionName}/getResult`,
  async (values) => {
    const { data } = await post<ResultRecord[]>(
      `/api/${actionName}/getResult`,
      values,
    );
    return data;
  },
);

export const querySubmit = createAsyncThunk<
  QuerySubmitResponse,
  QuerySubmitArg
>(`${actionName}/querySubmit`, async ({ eventDate }, { dispatch }) => {
  const sports = await dispatch(querySportByDate({ eventDate })).then(
    unwrapResult,
  );
  if (sports.length === 0) return { sports: [], leagues: [], results: [] };

  const leagues = await dispatch(
    queryLeagueByDate({
      eventDate,
      sportType: sports[0].sportType,
    }),
  ).then(unwrapResult);
  if (leagues.length === 0) return { sports: [], leagues: [], results: [] };

  const results = await dispatch(
    queryResult({
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
    const leagues = await dispatch(
      queryLeagueByDate({ eventDate, sportType }),
    ).then(unwrapResult);
    if (leagues.length === 0) return { leagues: [], results: [] };

    const results = await dispatch(
      queryResult({
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

const slice = createSlice({
  name: actionName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(querySportByDate.pending, (state) => {
      state.isSportLoading = true;
      state.results = [];
    });
    builder.addCase(querySportByDate.fulfilled, (state, { payload }) => {
      state.sports = payload;
      state.selectedSportType = payload[0]?.sportType ?? 0;
      state.isSportLoading = false;
    });

    builder.addCase(queryLeagueByDate.pending, (state, { meta }) => {
      state.isLeagueLoading = true;
      state.selectedSportType = meta.arg.sportType;
      state.results = [];
    });
    builder.addCase(queryLeagueByDate.fulfilled, (state, { payload }) => {
      state.leagues = payload;
      state.isLeagueLoading = false;
    });

    builder.addCase(queryResult.pending, (state) => {
      state.isResultLoading = true;
      state.results = [];
    });
    builder.addCase(queryResult.fulfilled, (state, { payload }) => {
      state.results = payload;
      state.isResultLoading = false;
    });

    builder.addCase(queryLeaguesAndResults.fulfilled, (state, { payload }) => {
      state.leagues = payload.leagues;
      state.results = payload.results;
    });
    builder.addCase(querySubmit.fulfilled, (state, { payload }) => {
      state.sports = payload.sports;
      state.leagues = payload.leagues;
      state.results = payload.results;
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

export default slice.reducer;
