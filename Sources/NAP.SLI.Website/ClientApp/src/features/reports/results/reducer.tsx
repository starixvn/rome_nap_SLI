import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getMinDate } from 'components/report-filter/reducer';
import { formatDate, getToday } from 'utils/DateUtils';

type NumberGameData = any;
type Happy5Data = any;

type QueryData = NumberGameData | Happy5Data;
type QueryArg = {
  date: string;
};
type Sport = 'NumberGame' | 'Happy5';

type State = {
  queryData?: QueryData;
  queryArg: QueryArg;
  sport: Sport;
  minDate: string;
};

const actionName = 'results';

const today = getToday();
const initialState: State = {
  queryData: undefined,
  queryArg: {
    date: formatDate(today),
  },
  sport: 'NumberGame',
  minDate: '',
};

export const query = createAsyncThunk<QueryData, QueryArg>(
  `${actionName}/query`,
  async (values, { rejectWithValue }) => {
    try {
      console.log('reducer: ', values);
      return setTimeout(
        () => ({
          test: 1,
        }),
        1000,
      );
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
