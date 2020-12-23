import { createSlice } from '@reduxjs/toolkit';
import { formatDate } from '../../../common/utils/DateUtils';
import axios from 'axios';
import { handleException } from '../../../common/utils/ExceptionUtils';

export const ReportType = {
  Daily: 1,
  Monthly: 2,
  Sport: 3
};

export type RootState = {
  winLossAnalysis: WinLossAnalysisState,
  username: string,
  custId: number,
  roleId: number
}

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

type WinLossAnalysisDataResponse = {
  records: WinLossAnalysisData[],
  total: WinLossAnalysisData
}

export type WinLossAnalysisState = {
  fromDate: any,
  toDate: any,
  customer: any,
  custId: number,
  roleId: number,
  productIds: number,
  reportType: number,
  data: WinLossAnalysisDataResponse
};

type DefaultFunction = () => void;

const slice = createSlice({
  name: "win-loss-analysis",
  initialState: {
    fromDate: undefined,
    toDate: undefined,
    customer: undefined,
    productIds: undefined,
    reportType: ReportType.Daily,
    data: undefined
  },
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