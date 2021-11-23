import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { post } from 'services/http';
import {
  CustomerInfo,
  BetSetting,
  AgentPtSetting,
  MasterPtSetting,
} from '../types';

type QueryProps = {
  custId: number;
};

export type QueryData = CustomerInfo &
  BetSetting &
  AgentPtSetting &
  MasterPtSetting & {
    // Position Taking
    // Super Max
    v161sPositionTaking_81_Max: number;
    v161sPositionTaking_83_Max: number;
    v161sPositionTaking_86_Max: number;
    v161sPositionTaking_88_Max: number;
    v161sLivePositionTaking_85_Max: number;
    v161sLivePositionTaking_86_Max: number;
    v161sLivePositionTaking_87_Max: number;
    v161sLivePositionTaking_89_Max: number;
    v161sLivePositionTaking_90_Max: number;
    // Super Min
    v161sPositionTaking_81_Min: number;
    v161sPositionTaking_83_Min: number;
    v161sPositionTaking_86_Min: number;
    v161sPositionTaking_88_Min: number;
    v161sLivePositionTaking_85_Min: number;
    v161sLivePositionTaking_86_Min: number;
    v161sLivePositionTaking_87_Min: number;
    v161sLivePositionTaking_89_Min: number;
    v161sLivePositionTaking_90_Min: number;
  };

type State = {
  data: QueryData | undefined;
};

const initialState: State = {
  data: undefined,
};

const sliceName = 'customer-setting-query-super';

export const query = createAsyncThunk<
  QueryData,
  QueryProps,
  {
    rejectValue: string;
  }
>(`${sliceName}`, async ({ custId }, { rejectWithValue }) => {
  try {
    const payload = {
      apiKey: 'customer-setting:query-super',
      data: {
        custId,
      },
    };
    const { data } = await post<QueryData>('/simple-api/query', payload);
    return data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(query.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const { reset } = slice.actions;

export default slice.reducer;
