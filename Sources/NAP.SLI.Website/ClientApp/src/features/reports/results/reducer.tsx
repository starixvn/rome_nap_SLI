import { createAsyncThunk, createSlice, unwrapResult } from '@reduxjs/toolkit';
import { download, post } from 'services/http';

type ResultArg = {
  fromDate: string;
  leagueId: number;
  sportType: number;
};

type ExcelArg = ResultArg & {
  leagueName: string;
  sportName: string;
};

type Match = {
  matchId: number;
  noMatch: string;
  leagueId: number;
  kickOffTime: string;
  eventStatus: string;
};

export type NumberGame = Match & {
  firstBall: Ball;
  secondBall: Ball;
  thirdBall: Ball;
  oeft: string;
};

export type Happy5 = Match & {
  firstBall: Ball;
  secondBall: Ball;
  thirdBall: Ball;
  fourthBall: Ball;
  fifthBall: Ball;
  totalBall: string;
  bigSmall: string;
  oddEven: string;
  fourSeason: string;
  moreOddMoreEven: string;
  soccer5: string;
  soccer5Class: string;
  combo: string;
  balls: string;
  eventStatusIsRefund: boolean;
};

type ResultRecord = {
  leagueName: string;
  matches: Array<NumberGame | Happy5>;
};

export type Ball = {
  number: string;
  color: string;
};

type SportArg = {
  fromDate: string;
};
type Sport = {
  sportType: number;
  sportName: string;
};

type LeagueArg = {
  fromDate: string;
  sportType: number;
};
type League = {
  leagueId: number;
  leagueName: string;
};

type Soccer5Arg = {
  matchId: number;
  balls: string;
  isDesktop: boolean;
};

type State = {
  sports: Sport[];
  leagues: League[];
  results: ResultRecord[];
  selectedSportType: number;
  isSportLoading: boolean;
  isLeagueLoading: boolean;
  isResultLoading: boolean;
  isSoccer5Loading: boolean;
  isExcelLoading: boolean;
};

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
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await post<Sport[]>(
        `/api/${actionName}/getResultSportByDate`,
        values,
      );
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const queryLeagueByDate = createAsyncThunk<League[], LeagueArg>(
  `${actionName}/getResultLeagueByDate`,
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await post<League[]>(
        `/api/${actionName}/getResultLeagueByDate`,
        values,
      );
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const queryResult = createAsyncThunk<ResultRecord[], ResultArg>(
  `${actionName}/getResult`,
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await post<ResultRecord[]>(
        `/api/${actionName}/getResult`,
        values,
      );
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const querySubmit = createAsyncThunk<
  { sports: Sport[]; leagues: League[]; results: ResultRecord[] },
  { fromDate: string }
>(
  `${actionName}/querySubmit`,
  async ({ fromDate }, { rejectWithValue, dispatch }) => {
    try {
      const sports = await dispatch(querySportByDate({ fromDate })).then(
        unwrapResult,
      );
      if (sports.length === 0) return { sports: [], leagues: [], results: [] };

      const leagues = await dispatch(
        queryLeagueByDate({ fromDate, sportType: sports[0].sportType }),
      ).then(unwrapResult);
      if (leagues.length === 0) return { sports: [], leagues: [], results: [] };

      const results = await dispatch(
        queryResult({
          fromDate,
          sportType: sports[0].sportType,
          leagueId: leagues[0].leagueId,
        }),
      ).then(unwrapResult);

      return {
        sports,
        leagues,
        results,
      };
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const queryLeaguesAndResults = createAsyncThunk<
  { leagues: League[]; results: ResultRecord[] },
  { fromDate: string; sportType: number }
>(
  `${actionName}/getLeaguesAndResults`,
  async ({ fromDate, sportType }, { rejectWithValue, dispatch }) => {
    try {
      const leagues = await dispatch(
        queryLeagueByDate({ fromDate, sportType }),
      ).then(unwrapResult);
      if (leagues.length === 0) return { leagues: [], results: [] };

      const results = await dispatch(
        queryResult({
          fromDate,
          sportType,
          leagueId: leagues[0].leagueId,
        }),
      ).then(unwrapResult);

      return {
        leagues,
        results,
      };
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const queryExcel = createAsyncThunk<void, ExcelArg>(
  `${actionName}/getExcel`,
  async (values, { rejectWithValue }) => {
    try {
      await download(`/api/${actionName}/excel`, values);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const querySoccer5 = createAsyncThunk<string, Soccer5Arg>(
  'third-party-result/getSoccer5Result',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await post<string>(
        'api/third-party-result/getSoccer5Result',
        values,
      );
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
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
