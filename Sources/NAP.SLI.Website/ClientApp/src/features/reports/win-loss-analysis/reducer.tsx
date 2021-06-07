import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { formatDate, getToday } from 'utils/DateUtils';
import { handleException } from 'utils/ExceptionUtils';
import { post, download } from 'services/http';

export enum ReportType {
  Daily = 1,
  Monthly = 2,
  Sport = 3,
}

type ExcelProps = {
  reportType: ReportType;
  custId: number;
  roleId: number;
  username: string;
  fromDate: string;
  toDate: string;
};

type QueryArg = {
  reportType: ReportType;
  fromDate: string;
  toDate: string;
};

type QueryProps = QueryArg & {
  custId: number;
  roleId: number;
};

type Record = {
  sportType: string;
  betCount: number;
  turnover: number;
  rollupKey: string;
  memberWinLoss: number;
  agentWinLoss: number;
  masterWinLoss: number;
  superWinLoss: number;
  companyWinLoss: number;
};

export type QueryData = {
  records: Array<Record>;
  total: Record;
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
    reportType: ReportType.Daily,
    fromDate: formatDate(today),
    toDate: formatDate(today),
  },
};

const sliceName = 'win-loss-analysis';

export const query = createAsyncThunk<QueryData, QueryProps>(
  `${sliceName}/query`,
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await post<QueryData>(
        '/api/win-loss-analysis/query',
        values,
      );
      const { records, total } = data;
      records.forEach((record) => calculateCompanyWinLoss(record));
      calculateCompanyWinLoss(total);
      return data;
    } catch (err) {
      handleException(err);
      return rejectWithValue(err);
    }
  },
);

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setReportType: (state, action: PayloadAction<ReportType>) => {
      state.queryArg.reportType = action.payload;
    },
    selectCustomer: (state, action: PayloadAction<Customer>) => {
      state.queryCustomer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(query.pending, (state, { meta }) => {
      const { fromDate, toDate, reportType } = meta.arg;
      state.queryArg = {
        fromDate,
        toDate,
        reportType,
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

export const excel = async (payload: ExcelProps) => {
  return await download('/api/win-loss-analysis/excel', payload);
};

export const { setReportType, selectCustomer } = slice.actions;

export const getReportName = (reportType: ReportType) => {
  return reportType === ReportType.Sport
    ? 'Sport'
    : reportType == ReportType.Monthly
    ? 'Monthly'
    : 'Daily';
};

export default slice.reducer;
