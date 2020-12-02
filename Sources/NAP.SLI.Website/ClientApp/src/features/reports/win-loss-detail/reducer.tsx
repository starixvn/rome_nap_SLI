// @ts-nocheck
import axios from 'axios';
import { createSlice, current } from '@reduxjs/toolkit';
import { formatDate } from '../../../common/utils/DateUtils';
import { DefaultPageSize } from '../../../common/utils/ReportUtils';

export const Modes = {
  Normal: 1,
  History: 2
}

const slice = createSlice({
  name: 'win-loss-detail',
  initialState: {
    mode: Modes.Normal,
    fromDate: undefined,
    toDate: undefined,
    customer: undefined,
    data: undefined,
    uplineCustomers: [],
    pageIndex: 1,
    pageSize: DefaultPageSize
  },
  reducers: {
    toggleMode: (state) => {
      if (state.mode === Modes.Normal) {
        state.mode = Modes.History;
      } else {
        state.mode = Modes.Normal;
      }
    },
    queryRequest: (state, action) => {
      const { fromDate, toDate } = action.payload;
      state.fromDate = fromDate;
      state.toDate = toDate;
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

const calculateCompanyWinLoss = (record) => {
  record.companyWinLoss = record.memberWinLoss + record.agentWinLoss + record.masterWinLoss || 0 + record.superWinLoss || 0;
};

export const { toggleMode, queryRequest, querySuccess, selectCustomer } = slice.actions;

export const query = (data, callback) => async (dispatch) => {
  try {
    dispatch(queryRequest({
      fromDate: formatDate(data.fromDate),
      toDate: formatDate(data.toDate)
    }));
    const response = await axios.post('/api/winlossdetail/query', data);
    const { records, total } = response.data;
    records.forEach((record) => calculateCompanyWinLoss(record));
    calculateCompanyWinLoss(total);
    dispatch(querySuccess({ data: response.data }));
  }
  finally {
    callback();
  }
}

export default slice.reducer;