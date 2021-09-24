import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { formatDate, getToday } from 'utils/DateUtils';
import { download, post } from 'services/http';

type QueryData = any;

type QueryArg = {
  fromDate: string;
  toDate: string;
};

type QueryProps = QueryArg & {
  custId: number;
  roleId: number;
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
  queryArg: QueryArg;
};

const actionName = 'bet-list';

const today = getToday();
const initialState: State = {
  queryCustomer: undefined,
  queryData: undefined,
  queryArg: {
    fromDate: formatDate(today),
    toDate: formatDate(today),
  },
};

export const query = createAsyncThunk<QueryData, QueryProps>(
  `${actionName}/query`,
  async (values, { rejectWithValue }) => {
    try {
      // const { data } = await post<QueryData>(
      //   `/api/${actionName}/query`,
      //   values,
      // );
      // return data;
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: 'test' });
        }, 1000);
      });
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
    selectCustomer: (state, action: PayloadAction<Customer>) => {
      state.queryCustomer = action.payload;
    },
    selectArg: (state, action: PayloadAction<QueryArg>) => {
      state.queryArg = action.payload;
    },
    resetArg: (state) => {
      state.queryArg = {
        fromDate: formatDate(today),
        toDate: formatDate(today),
      };
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

export const { selectCustomer, selectArg, resetArg } = slice.actions;

export default slice.reducer;
