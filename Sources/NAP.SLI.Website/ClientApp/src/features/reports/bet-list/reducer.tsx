import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { download, post } from 'services/http';
import { formatDate, getToday } from 'utils/DateUtils';
import { QueryData } from './types';

export type QueryArg = {
  betType: number;
  custId: number;
  roleId: number;
  fromDate: string;
  toDate: string;
};

export type Happy5LinkedGameProps = {
  obCustId: number;
  tranId3rd: number;
  isDesktop: boolean;
};

type State = {
  queryData?: QueryData;
  fromDate: string;
  toDate: string;
  isHappy5LinkedGameLoading: boolean;
};

const actionName = 'bet-list';
const today = getToday();

const initialState: State = {
  queryData: undefined,
  fromDate: formatDate(today),
  toDate: formatDate(today),
  isHappy5LinkedGameLoading: false,
};

export const getHappy5LinkedGame = createAsyncThunk<
  string,
  Happy5LinkedGameProps
>(
  'third-party-result/getHappy5LinkedGameResult',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await post<string>(
        'api/third-party-result/getHappy5LinkedGameResult',
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
});

export const { reset } = slice.actions;

export default slice.reducer;
