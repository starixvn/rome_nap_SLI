import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { handleException } from 'utils/ExceptionUtils';
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
    v161spositiontaking_81_max: number;
    v161spositiontaking_83_max: number;
    v161spositiontaking_86_max: number;
    v161spositiontaking_88_max: number;
    v161slivepositiontaking_85_max: number;
    v161slivepositiontaking_86_max: number;
    v161slivepositiontaking_87_max: number;
    v161slivepositiontaking_89_max: number;
    v161slivepositiontaking_90_max: number;
    // Super Min
    v161spositiontaking_81_min: number;
    v161spositiontaking_83_min: number;
    v161spositiontaking_86_min: number;
    v161spositiontaking_88_min: number;
    v161slivepositiontaking_85_min: number;
    v161slivepositiontaking_86_min: number;
    v161slivepositiontaking_87_min: number;
    v161slivepositiontaking_89_min: number;
    v161slivepositiontaking_90_min: number;
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
    handleException(err);
    return rejectWithValue(err);
  }
});

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    builder.addCase(query.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default slice.reducer;
