import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { post } from 'services/http';

type NumberGameArg = {
  fromDate: string;
  leagueId: number;
  sportType: number;
};
export type NumberGame = {
  leagueId: number;
  matchId: number;
  matchCode: string;
  eventDate: string;
  kickOffTime: string;
  eventStatus: string;
  seq: number[];
  ball: number[];
};
type NumberGameRecord = {
  leagueName: string;
  matches: NumberGame[];
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

type State = {
  sports: Sport[];
  leagues: League[];
  numberGames: NumberGameRecord[];
  selectedSportType: number;
  isSportLoading: boolean;
  isLeagueLoading: boolean;
  isNumberGameLoading: boolean;
};

const actionName = 'result';

const initialState: State = {
  sports: [],
  leagues: [],
  numberGames: [],
  selectedSportType: 0,
  isSportLoading: false,
  isLeagueLoading: false,
  isNumberGameLoading: false,
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

export const queryNumberGameByLeague = createAsyncThunk<
  NumberGameRecord[],
  NumberGameArg
>(`${actionName}/getNumberGameResult`, async (values, { rejectWithValue }) => {
  try {
    const { data } = await post<NumberGameRecord[]>(
      `/api/${actionName}/getNumberGameResult`,
      values,
    );
    return data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

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
    builder.addCase(queryNumberGameByLeague.pending, (state) => {
      state.isNumberGameLoading = true;
    });
    builder.addCase(queryNumberGameByLeague.fulfilled, (state, { payload }) => {
      state.numberGames = payload;
      state.isNumberGameLoading = false;
    });
  },
});

export default slice.reducer;
