import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { download, post } from 'services/http';
import { QueryData } from '../types';

export type QueryArg = {
  betType: number;
  custId: number;
  roleId: number;
  fromDate: string;
  toDate: string;
};

type State = {
  queryData?: QueryData;
  queryArg?: QueryArg;
};

const actionName = 'bet-list';

const initialState: State = {
  queryData: undefined,
  queryArg: undefined,
};

export const query = createAsyncThunk<QueryData, QueryArg>(
  `${actionName}/getByBettype`,
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await post<QueryData>(
        `/api/${actionName}/getByBettype`,
        values,
      );
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const excel = async (payload: QueryArg) => {
  return await download(`/api/${actionName}/excel`, payload);
};

const slice = createSlice({
  name: actionName,
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(query.pending, (state, { meta }) => {
      state.queryArg = meta.arg;
    });
    builder.addCase(query.fulfilled, (state, { payload }) => {
      state.queryData = payload;
    });
  },
});

export const { reset } = slice.actions;

export default slice.reducer;
