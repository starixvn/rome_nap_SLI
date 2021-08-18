import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { post } from 'services/http';
import {
  CustomerInfo,
  BetSetting,
  MasterPtSetting,
  SuperPtSetting,
} from '../types';

type QueryProps = {
  custId: number;
  srecommend: number;
};

export type QueryData = CustomerInfo &
  BetSetting &
  MasterPtSetting &
  SuperPtSetting & {
    // Position Taking
    // Auto Super Preset
    isAuto_v161sPositionTaking_81: number;
    isAuto_v161sPositionTaking_83: number;
    isAuto_v161sPositionTaking_88: number;
    isAuto_v161sPositionTaking_86: number;
    isAuto_v161sLivePositionTaking_85: number;
    isAuto_v161sLivePositionTaking_86: number;
    isAuto_v161sLivePositionTaking_87: number;
    isAuto_v161sLivePositionTaking_89: number;
    isAuto_v161sLivePositionTaking_90: number;
    auto_v161sPositionTaking_81: number;
    auto_v161sPositionTaking_83: number;
    auto_v161sPositionTaking_88: number;
    auto_v161sPositionTaking_86: number;
    auto_v161sLivePositionTaking_85: number;
    auto_v161sLivePositionTaking_86: number;
    auto_v161sLivePositionTaking_87: number;
    auto_v161sLivePositionTaking_89: number;
    auto_v161sLivePositionTaking_90: number;
    // Master Max Position
    v161mPositionTaking_81_Max: number;
    v161mPositionTaking_83_Max: number;
    v161mPositionTaking_88_Max: number;
    v161mPositionTaking_86_Max: number;
    v161mLivePositionTaking_85_Max: number;
    v161mLivePositionTaking_86_Max: number;
    v161mLivePositionTaking_87_Max: number;
    v161mLivePositionTaking_89_Max: number;
    v161mLivePositionTaking_90_Max: number;
    // Master Min Position
    v161mPositionTaking_81_Min: number;
    v161mPositionTaking_83_Min: number;
    v161mPositionTaking_88_Min: number;
    v161mPositionTaking_86_Min: number;
    v161mLivePositionTaking_85_Min: number;
    v161mLivePositionTaking_86_Min: number;
    v161mLivePositionTaking_87_Min: number;
    v161mLivePositionTaking_89_Min: number;
    v161mLivePositionTaking_90_Min: number;
  };

type State = {
  data: QueryData | undefined;
};

const initialState: State = {
  data: undefined,
};

const sliceName = 'customer-setting-query-master';

export const query = createAsyncThunk<
  QueryData,
  QueryProps,
  {
    rejectValue: string;
  }
>(`${sliceName}`, async ({ custId, srecommend }, { rejectWithValue }) => {
  try {
    const payload = {
      apiKey: 'customer-setting:query-master',
      data: {
        custId,
        srecommend,
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
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    builder.addCase(query.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default slice.reducer;
