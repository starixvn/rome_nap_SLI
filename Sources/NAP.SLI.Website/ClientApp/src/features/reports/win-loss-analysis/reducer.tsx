import { createSlice } from '@reduxjs/toolkit';
import { formatDate, getToday } from '../../../common/utils/DateUtils';
import { handleException } from '../../../common/utils/ExceptionUtils';
import { post } from '../../../common/services/http';

export const ReportType = {
  Daily: 1,
  Monthly: 2,
  Sport: 3,
};

type WinLossAnalysisRecord = {
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

export type WinLossAnalysisData = {
  records: Array<WinLossAnalysisRecord>;
  total: WinLossAnalysisRecord;
};

export type WinLossAnalysisState = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fromDate: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toDate: any;
  customer?: Customer;
  custId: number;
  roleId: number;
  productIds: number;
  reportType: number;
  data?: WinLossAnalysisData;
};

type DefaultFunction = () => void;

const today = getToday();
const initialState: WinLossAnalysisState = {
  fromDate: formatDate(today),
  toDate: formatDate(today),
  customer: undefined,
  custId: -1,
  roleId: 1,
  productIds: 1,
  reportType: ReportType.Daily,
  data: undefined,
};

const slice = createSlice({
  name: 'win-loss-analysis',
  initialState,
  reducers: {
    queryRequest: (state, action) => {
      const {
        fromDate,
        toDate,
        customer,
        productIds,
        reportType,
      } = action.payload;
      state.fromDate = fromDate;
      state.toDate = toDate;
      state.customer = customer;
      state.productIds = productIds;
      state.reportType = reportType;
      state.data = undefined;
    },
    querySuccess: (state, action) => {
      state.data = action.payload.data;
    },
  },
});

export const { queryRequest, querySuccess } = slice.actions;

const calculateCompanyWinLoss = (winLoss: WinLossAnalysisRecord) => {
  winLoss.companyWinLoss =
    -winLoss.memberWinLoss +
    winLoss.agentWinLoss +
    (winLoss.masterWinLoss || 0) +
    (winLoss.superWinLoss || 0);
};

type QueryData = {
  records: Array<WinLossAnalysisRecord>;
  total: WinLossAnalysisRecord;
};
export const query = (
  data: WinLossAnalysisState,
  callback: DefaultFunction,
) => async (dispatch: AppDispatch) => {
  try {
    dispatch(
      queryRequest({
        fromDate: formatDate(data.fromDate),
        toDate: formatDate(data.toDate),
        customer: {
          custId: data.custId,
          roleId: data.roleId,
        },
        productIds: data.productIds,
        reportType: data.reportType,
      }),
    );

    const response = await post<QueryData>('/api/winlossanalysis/query', data);
    const { records, total } = response.data;
    records.forEach((record) => calculateCompanyWinLoss(record));
    calculateCompanyWinLoss(total);
    dispatch(querySuccess({ data: response.data }));
  } catch (e) {
    handleException(e);
  } finally {
    callback();
  }
};

export default slice.reducer;
