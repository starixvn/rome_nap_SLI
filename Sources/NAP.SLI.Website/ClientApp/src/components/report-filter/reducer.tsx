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

const actionName = 'report-filter';

export const getMinDate = createAsyncThunk<QueryData>(
  `${actionName}/getMinDate`,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await get<QueryData>(`/api/report/mindate`);
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
    builder.addCase(getMinDate.fulfilled, (state, { payload }) => {
      state.minDate = payload.balanceUpDay;
    });
  },
});

export default slice.reducer;
