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

type Record = {
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

export const { selectCustomer } = slice.actions;

export default slice.reducer;
