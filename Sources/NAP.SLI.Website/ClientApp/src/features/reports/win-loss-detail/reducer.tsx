import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PageSize } from 'utils/ReportUtils';
import { formatDate, getToday } from 'utils/DateUtils';
import { download, post } from 'services/http';

export type Record = {
  custId: number;
  username: string;
  betCount: number;
  turnover: number;
  companyWinLoss: number;
  superWinLoss: number;
  masterWinLoss: number;
  agentWinLoss: number;
  memberWinLoss: number;
};

type QueryArg = {
  isHistory: boolean;
  fromDate: string;
  toDate: string;
  pageIndex: number;
  pageSize: number;
};

type QueryProps = QueryArg & {
  custId: number;
  roleId: number;
};

type ExcelProps = {
  custId: number;
  roleId: number;
  username: string;
  isHistory: boolean;
  fromDate: string;
  toDate: string;
};

type State = {
  customers: Customer[];
  customer?: Customer;
  queryArg: QueryArg;
  queryData?: QueryData;
  isQuerying: boolean;
};

export type QueryData = {
  records: Record[];
  total: Record;
  totalRecords: number;
};

const today = getToday();
const initialState: State = {
  customers: [],
  customer: undefined,
  queryData: undefined,
  queryArg: {
    isHistory: false,
    fromDate: formatDate(today),
    toDate: formatDate(today),
    pageIndex: 1,
    pageSize: PageSize,
  },
  isQuerying: false,
};
const actionName = 'win-loss-detail';

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
    reset: (state) => {
      Object.assign(state, initialState);
    },
    toggleMode: (state) => {
      state.queryArg.isHistory = !state.queryArg.isHistory;
      state.queryArg.fromDate = formatDate(today);
      state.queryArg.toDate = formatDate(today);
    },
    select: (state, action: PayloadAction<Customer>) => {
      const customer = action.payload;
      state.customer = customer;
      state.customers = [customer];
    },
    drillDown: (state, action: PayloadAction<Customer>) => {
      const customer = action.payload;
      state.customer = customer;
      state.customers.push(customer);
    },
    drillUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.customer = state.customers[index];
      state.customers = state.customers.slice(0, index + 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(query.pending, (state, { meta }) => {
      const { fromDate, toDate, pageIndex, pageSize, isHistory } = meta.arg;
      state.isQuerying = true;
      state.queryArg = {
        fromDate,
        toDate,
        pageIndex,
        pageSize,
        isHistory,
      };
    });
    builder.addCase(query.fulfilled, (state, { payload }) => {
      state.isQuerying = false;
      state.queryData = payload;
    });
  },
});

export const { toggleMode, select, drillDown, drillUp, reset } = slice.actions;

export default slice.reducer;
