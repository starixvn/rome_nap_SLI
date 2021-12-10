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

type ExcelProps = {
  custId: number;
  roleId: number;
  username: string;
  fromDate: string;
  toDate: string;
};

type State = {
  queryData?: QueryData;
  queryArg?: QueryArg;
};

const actionName = 'bet-list';

const initialState: State = {
  queryData: undefined,
  queryArg: undefined,
};

export const getByMatch = createAsyncThunk<QueryData, QueryArg>(
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
    builder.addCase(getByMatch.pending, (state, { meta }) => {
      state.queryArg = meta.arg;
    });
    builder.addCase(getByMatch.fulfilled, (state, { payload }) => {
      state.queryData = payload;
    });
  },
});

export const { reset } = slice.actions;

export default slice.reducer;
