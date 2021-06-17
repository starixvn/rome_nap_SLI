import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { formatDate, getToday } from 'utils/DateUtils';
import { handleException } from 'utils/ExceptionUtils';
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

type Record = {
  betTypeName: string;
  turnover: number;
  memberWinLoss: number;
  agentWinLoss: number;
  masterWinLoss: number;
  superWinLoss: number;
  companyWinLoss: number;
};

export type QueryData = {
  total: Record;
  matches: MatchData[];
};

type State = {
  queryCustomer?: Customer;
  queryArg: QueryArg;
  queryData?: QueryData;
};

const today = getToday();
const initialState: State = {
  queryCustomer: undefined,
  queryData: undefined,
  queryArg: {
    fromDate: formatDate(today),
    toDate: formatDate(today),
  },
};

const actionName = 'match-win-loss-detail';

export const query = createAsyncThunk<QueryData, QueryProps>(
  `${actionName}/query`,
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await post<QueryData>(
        `/api/${actionName}/query`,
        values,
      );
      const { total, matches } = data;
      matches.forEach((match) => {
        match.records.forEach((record) => calculateCompanyWinLoss(record));
        calculateCompanyWinLoss(match.total);
      });
      calculateCompanyWinLoss(total);
      return data;
    } catch (err) {
      handleException(err);
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
    selectCustomer: (state, action: PayloadAction<Customer>) => {
      state.queryCustomer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(query.pending, (state, { meta }) => {
      const { fromDate, toDate } = meta.arg;
      state.queryArg = {
        fromDate,
        toDate,
      };
    });
    builder.addCase(query.fulfilled, (state, { payload }) => {
      state.queryData = payload;
    });
  },
});

const calculateCompanyWinLoss = (winLoss: Record) => {
  winLoss.companyWinLoss =
    -winLoss.memberWinLoss +
    winLoss.agentWinLoss +
    (winLoss.masterWinLoss || 0) +
    (winLoss.superWinLoss || 0);
};

export const { selectCustomer } = slice.actions;

export default slice.reducer;
