import { createAsyncThunk, createSlice, unwrapResult } from '@reduxjs/toolkit';
import { download, post } from 'services/http';
import { SHOW_ALL_LEAGUES, SportTypes } from 'utils/ConstantUtils';

export type Match = {
  matchId: number;
  matchNo: string;
  leagueId: number;
  kickOffTime: string;
  eventStatus: string;
};

export type NumberGameMatch = Match & {
  firstBall: Ball;
  secondBall: Ball;
  thirdBall: Ball;
  oeft: string;
};

export type Happy5Match = Match & {
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

export type Result = {
  leagueName: string;
  matches: Array<NumberGameMatch | Happy5Match>;
};

export type Ball = {
  number: string;
  color: string;
};

export type Sport = {
  sportType: number;
  sportName: string;
};

export type League = {
  leagueId: number;
  leagueName: string;
};

export type State = {
  sports: Sport[];
  leagues: League[];
  results: Result[];
  sportType: number;
  isSportLoading: boolean;
  isLeagueLoading: boolean;
  isResultLoading: boolean;
  isExcelLoading: boolean;
  isFromBetList: boolean;
  happy5LinkedGameResultUrl: string;
};

const actionName = 'result';

const initialState: State = {
  sports: [],
  leagues: [],
  results: [],
  sportType: 0,
  isSportLoading: false,
  isLeagueLoading: false,
  isResultLoading: false,
  isExcelLoading: false,
  isFromBetList: false,
  happy5LinkedGameResultUrl: '',
};

const querySports = createAsyncThunk<
  Sport[],
  {
    eventDate: string;
  }
>(`${actionName}/querySports`, async (values) => {
  const { data } = await post<Sport[]>(
    `/api/${actionName}/querySports`,
    values,
  );
  return data;
});

const queryLeagues = createAsyncThunk<
  League[],
  {
    eventDate: string;
    sportType: number;
  }
>(`${actionName}/queryLeagues`, async (values) => {
  const { data } = await post<League[]>(
    `/api/${actionName}/queryLeagues`,
    values,
  );
  const allItem: League = {
    leagueId: 0,
    leagueName: SHOW_ALL_LEAGUES,
  };
  return [allItem].concat(data);
});

export const queryResultsByDate = createAsyncThunk<
  Result[],
  {
    eventDate: string;
    leagueId: number;
    sportType: number;
  }
>(`${actionName}/queryResultsByDate`, async (values) => {
  const { data } = await post<Result[]>(
    `/api/${actionName}/queryResultsByDate`,
    values,
  );
  return data;
});

export const queryResultsByMatch = createAsyncThunk<
  Result[],
  {
    matchId: number;
    sportType: number;
  }
>(`${actionName}/queryResultsByMatch`, async (values) => {
  const { data } = await post<Result[]>(
    `/api/${actionName}/queryResultsByMatch`,
    values,
  );
  return data;
});

export const queryResults = createAsyncThunk<
  {
    sports: Sport[];
    leagues: League[];
    results: Result[];
  },
  {
    eventDate: string;
  }
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
  {
    leagues: League[];
    results: Result[];
  },
  {
    eventDate: string;
    sportType: number;
  }
>(
  `${actionName}/queryLeaguesAndResults`,
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

export const queryExcel = createAsyncThunk<
  void,
  {
    eventDate: string;
    leagueId: number;
    sportType: number;
    leagueName: string;
    sportName: string;
  }
>(`${actionName}/getExcel`, async (values) => {
  await download(`/api/${actionName}/excel`, values);
});

export const querySoccer5 = async (values: {
  matchId: number;
  balls: string;
}) => {
  const { data } = await post<string>(
    'api/third-party-result/querySoccer5Result',
    values,
  );
  return data;
};

export const queryHappy5LinkedGameResult = createAsyncThunk<
  string,
  {
    custId: number;
    transId: number;
  }
>('third-party-result/queryHappy5LinkedGameResult', async (values) => {
  const { data } = await post<string>(
    'api/third-party-result/queryHappy5LinkedGameResult',
    values,
  );
  return data;
});

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
      state.results = [];
    });
    builder.addCase(querySports.fulfilled, (state, { payload }) => {
      state.isSportLoading = false;
      state.sports = payload;
      state.sportType = payload[0]?.sportType ?? 0;
    });

    builder.addCase(queryLeagues.pending, (state, { meta }) => {
      state.isLeagueLoading = true;
      state.sportType = meta.arg.sportType;
      state.results = [];
    });
    builder.addCase(queryLeagues.fulfilled, (state, { payload }) => {
      state.isLeagueLoading = false;
      state.leagues = payload;
    });

    builder.addCase(queryResultsByDate.pending, (state) => {
      state.isResultLoading = true;
      state.isFromBetList = false;
      state.results = [];
    });
    builder.addCase(queryResultsByDate.fulfilled, (state, { payload }) => {
      state.isResultLoading = false;
      state.results = payload;
    });

    builder.addCase(queryResultsByMatch.pending, (state, { meta }) => {
      state.isResultLoading = true;
      state.isFromBetList = true;
      state.sportType = meta.arg.sportType;
      state.results = [];
    });
    builder.addCase(queryResultsByMatch.fulfilled, (state, { payload }) => {
      state.isResultLoading = false;
      state.results = payload;
    });

    builder.addCase(queryLeaguesAndResults.fulfilled, (state, { payload }) => {
      state.leagues = payload.leagues;
      state.results = payload.results;
    });
    builder.addCase(queryResults.fulfilled, (state, { payload }) => {
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

    builder.addCase(queryHappy5LinkedGameResult.pending, (state) => {
      state.isResultLoading = true;
      state.sportType = SportTypes.Happy5_Linked_Game;
    });
    builder.addCase(
      queryHappy5LinkedGameResult.fulfilled,
      (state, { payload }) => {
        state.isResultLoading = false;
        state.happy5LinkedGameResultUrl = payload;
      },
    );
  },
});

export const { reset } = slice.actions;

export default slice.reducer;
