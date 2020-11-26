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
      state.custId = action.payload.custId;
      state.fromDate = action.payload.fromDate;
      state.toDate = action.payload.toDate;
      state.data = undefined;
    },
    querySuccess: (state, action) => {
      state.data = action.payload.data;
    }
  }
});

export const { toggleMode, queryRequest, querySuccess } = slice.actions;

export const query = (data, callback) => async (dispatch) => {
  dispatch(queryRequest({
    custId: data.custId,
    fromDate: formatDate(data.fromDate),
    toDate: formatDate(data.toDate)
  }));
  const response = await axios.post('/api/winlossdetail/query', data);
  callback();
  dispatch(querySuccess({ data: response.data }));
}

export default slice.reducer;