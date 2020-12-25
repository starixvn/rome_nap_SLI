import { createSlice } from '@reduxjs/toolkit';
import { formatDate, getToday } from '../../../common/utils/DateUtils';
import axios from 'axios';
import { handleException } from '../../../common/utils/ExceptionUtils';

export const ReportType = {
  Daily: 1,
  Monthly: 2,
  Sport: 3
};

type WinLossAnalysisData = {
  sportType: string;
  betCount: number;
  turnover: number;
  rollupKey: string,
  memberWinLoss: number,
  agentWinLoss: number,
  masterWinLoss: number,
  superWinLoss: number,
  companyWinLoss: number,
};

export type WinLossAnalysisDataResponse = {
  records: WinLossAnalysisData[],
  total: WinLossAnalysisData
}

export type WinLossAnalysisState = {
  fromDate: any,
  toDate: any,
  customer: Customer | undefined,
  custId: number,
  roleId: number,
  productIds: number,
  reportType: number,
  data: WinLossAnalysisDataResponse | undefined
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
  data: undefined
}

const slice = createSlice({
  name: "win-loss-analysis",
  initialState,
  reducers: {
    queryRequest: (state, action) => {
      const { fromDate, toDate, customer, productIds, reportType } = action.payload;
      state.fromDate = fromDate;
      state.toDate = toDate;
      state.customer = customer;
      state.productIds = productIds;
      state.reportType = reportType;
      state.data = undefined;
    },
    querySuccess: (state, action) => {
      state.data = action.payload.data;
    }
  }
});

export const { queryRequest, querySuccess } = slice.actions;

const calculateCompanyWinLoss = (winLoss: WinLossAnalysisData) => {
  winLoss.companyWinLoss = winLoss.memberWinLoss + winLoss.agentWinLoss + winLoss.masterWinLoss || 0 + winLoss.superWinLoss || 0;
};

export const query = (data: WinLossAnalysisState, callback: DefaultFunction) => async (dispatch: any) => {
  try {
    dispatch(queryRequest({
      fromDate: formatDate(data.fromDate),
      toDate: formatDate(data.toDate),
      customer: {
        custId: data.custId,
        roleId: data.roleId
      },
      productIds: data.productIds,
      reportType: data.reportType
    }));

    const response = await axios.post('/api/winlossanalysis/query', data);
    const { records, total } = response.data;
    records.forEach((record: WinLossAnalysisData) => calculateCompanyWinLoss(record));
    calculateCompanyWinLoss(total);
    dispatch(querySuccess({ data: response.data }));
  }
  catch (e) {
    handleException(e);
  }
  finally {
    callback();
  }
}

export default slice.reducer;