import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { formatDate } from '../../../common/utils/DateUtils';

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
    data: undefined
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
      const { fromDate, toDate, customer } = action.payload;
      state.fromDate = fromDate;
      state.toDate = toDate;
      state.customer = customer;
      state.data = undefined;
    },
    querySuccess: (state, action) => {
      state.data = action.payload.data;
    }
  }
});

const calculateCompanyWinLoss = (record) => {
  record.companyWinLoss = record.memberWinLoss + record.agentWinLoss + record.masterWinLoss || 0 + record.superWinLoss || 0;
};

export const { toggleMode, queryRequest, querySuccess } = slice.actions;

export const query = (data, callback) => async (dispatch) => {
  try {
    dispatch(queryRequest({
      fromDate: formatDate(data.fromDate),
      toDate: formatDate(data.toDate),
      customer: {
        custId: data.custId,
        roleId: data.roleId
      }
    }));
    Object.assign(data, {
      pageSize: 25,
      pageIndex: 1
    });
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