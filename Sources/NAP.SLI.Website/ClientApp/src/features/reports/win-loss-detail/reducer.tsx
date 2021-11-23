import {
  createAsyncThunk,
  createSlice,
  current,
  PayloadAction,
} from '@reduxjs/toolkit';
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
  uplineCustomers: Customer[];
  queryCustomer?: Customer;
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
  uplineCustomers: [],
  queryCustomer: undefined,
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

export const excel = async (payload: ExcelProps) => {
  return await download(`/api/${actionName}/excel`, payload);
};

const slice = createSlice({
  name: actionName,
  initialState,
  reducers: {
    reset: () => initialState,
    toggleMode: (state) => {
      state.queryArg.isHistory = !state.queryArg.isHistory;
    },
    selectCustomer: (
      state,
      action: PayloadAction<{ customer: Customer; isReset: boolean }>,
    ) => {
      const { customer, isReset } = action.payload;
      const currentState = current(state);
      if (isReset || !currentState.queryCustomer) {
        state.queryCustomer = customer;
        state.uplineCustomers = [];
      } else {
        const uplineCustomers = [];
        let isDrillDown = true;
        for (let i = 0; i < currentState.uplineCustomers.length; i++) {
          const uplineCustomer = currentState.uplineCustomers[i];
          if (uplineCustomer.custId === customer.custId) {
            isDrillDown = false;
            break;
          }

          uplineCustomers.push(uplineCustomer);
        }

        if (isDrillDown) {
          uplineCustomers.push(currentState.queryCustomer);
        }

        state.queryCustomer = customer;
        state.uplineCustomers = uplineCustomers;
      }
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

export const { toggleMode, selectCustomer, reset } = slice.actions;

export default slice.reducer;
