import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get } from 'services/http';

type QueryData = {
  balanceUpDay: string;
  moveBetsDay: string;
};

type State = {
  minDate: string;
};

const initialState: State = {
  minDate: '',
};

const actionName = 'report';

export const getBalanceUpDay = createAsyncThunk<QueryData>(
  `${actionName}/getBalanceUpDay`,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await get<QueryData>(`/api/report/balance-up-day`);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const slice = createSlice({
  name: actionName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBalanceUpDay.fulfilled, (state, { payload }) => {
      state.minDate = payload.balanceUpDay;
    });
  },
});

export default slice.reducer;
