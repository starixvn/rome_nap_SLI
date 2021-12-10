import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { download, post } from 'services/http';

export type Ticket = {
  AgentPTComHtml: string;
  ChoiceHtml: string;
  MasterPTComHtml: string;
  OddHtml: string;
  PlayerComm: number;
  StakeHtml: string;
  Status: string;
  StatusHtml: string;
  SuperPTComHtml: string;
  TransDateHtml: string;
  WinLossHtml: string;
  Winlost: number;
};

type QueryData = {
  Tickets: Ticket[];
  SumCommHtml: string;
  SumWinLossHtml: string;
  TotalHtml: string;
};

export type QueryArg = {
  matchId: number;
  betType: number;
  liveIndicator: number;
  custId: number;
  roleId: number;
  username: string;
  fromDate: string;
  toDate: string;
};

export type QueryByDateProps = QueryArg & {
  custId: number;
};

export type QueryByMatchProps = {
  matchId: number;
  betType: number;
  liveIndicator: number;
  custId: number;
  roleId: number;
  username: string;
  fromDate: string;
  toDate: string;
};

export type QueryByBettypeProps = QueryArg & {
  bettype: number;
  custId: number;
  roleId: number;
};

export type Happy5LinkedGameProps = {
  obCustId: number;
  tranId3rd: number;
  isDesktop: boolean;
};

type ExcelProps = {
  custId: number;
  roleId: number;
  username: string;
  fromDate: string;
  toDate: string;
};

type State = {
  queryCustomer?: Customer;
  queryData?: QueryData;
  queryArg?: QueryArg;
  isHappy5LinkedGameLoading: boolean;
};

const actionName = 'bet-list';

const initialState: State = {
  queryCustomer: undefined,
  queryData: undefined,
  queryArg: undefined,
  isHappy5LinkedGameLoading: false,
};

export const getByDate = createAsyncThunk<QueryData, QueryByDateProps>(
  `${actionName}/getByDate`,
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await post<QueryData>(
        `/api/${actionName}/getByDate`,
        values,
      );
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getByMatch = createAsyncThunk<QueryData, QueryByMatchProps>(
  `${actionName}/getByMatch`,
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await post<QueryData>(
        `/api/${actionName}/getByMatch`,
        values,
      );
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getByBettype = createAsyncThunk<QueryData, QueryByBettypeProps>(
  `${actionName}/getByBettype`,
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await post<QueryData>(
        `/api/${actionName}/getByBettype`,
        values,
      );
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getHappy5LinkedGame = createAsyncThunk<
  string,
  Happy5LinkedGameProps
>(
  'third-party-result/getHappy5LinkedGameResult',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await post<string>(
        'api/third-party-result/getHappy5LinkedGameResult',
        values,
      );
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const excel = async (payload: ExcelProps) => {
  return await download(`/api/${actionName}/excel`, payload);
};

const slice = createSlice({
  name: actionName,
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getByDate.fulfilled, (state, { payload }) => {
      state.queryData = payload;
    });
    builder.addCase(getByMatch.pending, (state, { meta }) => {
      state.queryArg = meta.arg;
    });
    builder.addCase(getByMatch.fulfilled, (state, { payload }) => {
      state.queryData = payload;
    });
    builder.addCase(getByBettype.fulfilled, (state, { payload }) => {
      state.queryData = payload;
    });
    builder.addCase(getHappy5LinkedGame.pending, (state) => {
      state.isHappy5LinkedGameLoading = true;
    });
    builder.addCase(getHappy5LinkedGame.fulfilled, (state) => {
      state.isHappy5LinkedGameLoading = false;
    });
  },
});

export const { reset } = slice.actions;

export default slice.reducer;
