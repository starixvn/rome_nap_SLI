import axios from 'axios';
import { createSlice, current } from '@reduxjs/toolkit';
import { PageSize } from '../../../common/utils/ReportUtils';
import { handleException } from '../../../common/utils/ExceptionUtils';
import { formatDate, getToday } from '../../../common/utils/DateUtils';
import { AppDispatch } from '../../../store';

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

type State = {
  mode: number;
  fromDate: string;
  toDate: string;
  customer: Customer | undefined;
  data: QueryData | undefined;
  uplineCustomers: Customer[];
  pageIndex: number;
  pageSize: number;
};

type QueryPayload = {
  custId: number;
  roleId: number;
  fromDate: string;
  toDate: string;
  pageIndex: number;
  pageSize: number;
};

export type QueryData = {
  records: Record[];
  total: Record;
  totalRecords: number;
};

export const Modes = {
  Normal: 1,
  History: 2
};

const today = getToday();
const initialState: State = {
  mode: Modes.Normal,
  fromDate: formatDate(today),
  toDate: formatDate(today),
  customer: undefined,
  data: undefined,
  uplineCustomers: [],
  pageIndex: 1,
  pageSize: PageSize
}

const slice = createSlice({
  name: 'win-loss-detail',
  initialState,
  reducers: {
    toggleMode: (state) => {
      if (state.mode === Modes.Normal) {
        state.mode = Modes.History;
      } else {
        state.mode = Modes.Normal;
      }
    },
    queryRequest: (state, action) => {
      const { fromDate, toDate, pageIndex, pageSize } = action.payload as QueryPayload;
      state.fromDate = fromDate;
      state.toDate = toDate;
      state.pageIndex = pageIndex;
      state.pageSize = pageSize;
      state.data = undefined;
    },
    querySuccess: (state, action) => {
      state.data = action.payload.data;
    },
    selectCustomer: (state, action) => {
      const { customer, isReset } = action.payload;
      const currentState = current(state);
      if (isReset || !currentState.customer) {
        state.customer = customer;
        state.uplineCustomers = [];
      }
      else {
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
          uplineCustomers.push(currentState.customer);
        }

        state.customer = customer;
        state.uplineCustomers = uplineCustomers;
      }
    }
  }
});

const calculateCompanyWinLoss = (record: Record) => {
  record.companyWinLoss = record.memberWinLoss + record.agentWinLoss + record.masterWinLoss || 0 + record.superWinLoss || 0;
};

export const { toggleMode, queryRequest, querySuccess, selectCustomer } = slice.actions;

export const query = (payload: QueryPayload, callback: Func) => async (dispatch: AppDispatch) => {
  try {
    dispatch(queryRequest(payload));
    const response = await axios.post('/api/winlossdetail/query', payload);
    const { records, total } = response.data as QueryData;
    records.forEach((record) => calculateCompanyWinLoss(record));
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