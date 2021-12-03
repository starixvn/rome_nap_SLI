import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { post } from 'services/http';

type ResultArg = {
  fromDate: string;
  leagueId: number;
  sportType: number;
};
export type Result = {
  leagueId: number;
  matchId: number;
  matchCode: string;
  eventDate: string;
  kickOffTime: string;
  eventStatus: string;
  seq: number[];
  ball: number[];
};
type ResultRecord = {
  leagueName: string;
  matches: Result[];
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
  sportId: number;
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
  isNumberGameLoading: boolean;
  isSoccer5Loading: boolean;
};

const actionName = 'result';

const initialState: State = {
  sports: [],
  leagues: [],
  results: [],
  selectedSportType: 0,
  isSportLoading: false,
  isLeagueLoading: false,
  isNumberGameLoading: false,
  isSoccer5Loading: false,
};

export const querySportByDate = createAsyncThunk<Sport[], SportArg>(
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

export const queryLeagueByDate = createAsyncThunk<League[], LeagueArg>(
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

export const queryResultByLeague = createAsyncThunk<ResultRecord[], ResultArg>(
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
    });
    builder.addCase(querySportByDate.fulfilled, (state, { payload }) => {
      state.sports = payload;
      state.selectedSportType = payload[0]?.sportType ?? 0;
      state.isSportLoading = false;
    });
    builder.addCase(queryLeagueByDate.pending, (state, { meta }) => {
      state.isLeagueLoading = true;
      state.selectedSportType = meta.arg.sportId;
    });
    builder.addCase(queryLeagueByDate.fulfilled, (state, { payload }) => {
      state.leagues = payload;
      state.isLeagueLoading = false;
    });
    builder.addCase(queryResultByLeague.pending, (state) => {
      state.isNumberGameLoading = true;
    });
    builder.addCase(queryResultByLeague.fulfilled, (state, { payload }) => {
      state.results = payload;
      state.isNumberGameLoading = false;
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
