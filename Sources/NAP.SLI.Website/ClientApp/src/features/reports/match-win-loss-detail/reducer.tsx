import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { formatDate, getToday } from 'utils/DateUtils';
import { post, download } from 'services/http';

type QueryArg = {
  fromDate: string;
  toDate: string;
};

type QueryProps = QueryArg & {
  custId: number;
  roleId: number;
};

type ExcelProps = QueryProps & {
  username: string;
};

type MatchData = {
  leagueName: string;
  matchName: string;
  total: Record;
  records: Record[];
};

export type Record = {
  betTypeName: string;
  turnover: number;
  memberWinLoss: number;
  agentWinLoss: number;
  masterWinLoss: number;
  superWinLoss: number;
  companyWinLoss: number;
  betType: number;
  matchId: number;
  liveIndicator: number;
};

export type QueryData = {
  total: Record;
  grandTotal: Record;
  happy5LinkedGames: Record[];
  matches: MatchData[];
};

type State = {
  queryCustomer?: Customer;
  queryArg: QueryArg;
  queryData?: QueryData;
  isQuerying: boolean;
};

const today = getToday();
const initialState: State = {
  queryCustomer: undefined,
  queryData: undefined,
  queryArg: {
    fromDate: formatDate(today),
    toDate: formatDate(today),
  },
  isQuerying: false,
};

const actionName = 'match-win-loss-detail';

export const query = createAsyncThunk<QueryData, QueryProps>(
  `${actionName}/query`,
  async (values) => {
    const { data } = await post<QueryData>(`/api/${actionName}/query`, values);
    return data;
  },
);

export const excel = createAsyncThunk<void, ExcelProps>(
  `${actionName}/excel`,
  async (values) => {
    await download(`/api/${actionName}/excel`, values);
  },
);

const slice = createSlice({
  name: actionName,
  initialState,
  reducers: {
    reset: () => initialState,
    selectCustomer: (state, action: PayloadAction<Customer>) => {
      state.queryCustomer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(query.pending, (state, { meta }) => {
      const { fromDate, toDate } = meta.arg;
      state.isQuerying = true;
      state.queryArg = {
        fromDate,
        toDate,
      };
    });
    builder.addCase(query.fulfilled, (state, { payload }) => {
      state.isQuerying = false;
      state.queryData = payload;
    });
  },
});

export const { selectCustomer, reset } = slice.actions;

export default slice.reducer;
