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

export type Record = {
  betType: number;
  betTypeName: string;
  betCount: number;
  turnover: number;
  memberWinLoss: number;
  agentWinLoss: number;
  agentTotal: number;
  masterWinLoss: number;
  masterTotal: number;
  superWinLoss: number;
  companyWinLoss: number;
};

export type QueryData = {
  total: Record;
  records: Record[];
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

const actionName = 'win-loss-by-bet-type';

export const query = createAsyncThunk<QueryData, QueryProps>(
  `${actionName}/query`,
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await post<QueryData>(
        `/api/${actionName}/query`,
        values,
      );
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const excel = createAsyncThunk<void, ExcelProps>(
  `${actionName}/excel`,
  async (values, { rejectWithValue }) => {
    try {
      await download(`/api/${actionName}/excel`, values);
    } catch (err) {
      return rejectWithValue(err);
    }
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
