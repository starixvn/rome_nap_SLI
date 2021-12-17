import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { post } from 'services/http';
import {
  CustomerInfo,
  BetSetting,
  AgentPtSetting,
  MasterPtSetting,
  SuperPtSetting,
} from '../types';

type QueryProps = {
  custId: number;
};

export type QueryData = CustomerInfo &
  BetSetting &
  AgentPtSetting &
  MasterPtSetting &
  SuperPtSetting & {
    // Position Taking
    // Master Auto
    isAuto_v161mPositionTaking_81: number;
    isAuto_v161mPositionTaking_83: number;
    isAuto_v161mPositionTaking_88: number;
    isAuto_v161mPositionTaking_86: number;
    auto_v161mPositionTaking_81: number;
    auto_v161mPositionTaking_83: number;
    auto_v161mPositionTaking_88: number;
    auto_v161mPositionTaking_86: number;
    isAuto_v161mLivePositionTaking_85: number;
    isAuto_v161mLivePositionTaking_86: number;
    isAuto_v161mLivePositionTaking_87: number;
    isAuto_v161mLivePositionTaking_89: number;
    isAuto_v161mLivePositionTaking_90: number;
    auto_v161mLivePositionTaking_85: number;
    auto_v161mLivePositionTaking_86: number;
    auto_v161mLivePositionTaking_87: number;
    auto_v161mLivePositionTaking_89: number;
    auto_v161mLivePositionTaking_90: number;
    // Super Auto
    auto_v161sPositionTaking_81: number;
    auto_v161sPositionTaking_83: number;
    auto_v161sPositionTaking_86: number;
    auto_v161sPositionTaking_88: number;
    isAuto_v161sPositionTaking_81: number;
    isAuto_v161sPositionTaking_83: number;
    isAuto_v161sPositionTaking_88: number;
    isAuto_v161sPositionTaking_86: number;
    auto_v161sLivePositionTaking_85: number;
    auto_v161sLivePositionTaking_86: number;
    auto_v161sLivePositionTaking_87: number;
    auto_v161sLivePositionTaking_89: number;
    auto_v161sLivePositionTaking_90: number;
    isAuto_v161sLivePositionTaking_85: number;
    isAuto_v161sLivePositionTaking_86: number;
    isAuto_v161sLivePositionTaking_87: number;
    isAuto_v161sLivePositionTaking_89: number;
    isAuto_v161sLivePositionTaking_90: number;
  };

type State = {
  data: QueryData | undefined;
};

const initialState: State = {
  data: undefined,
};

const sliceName = 'customer-setting-query-member';

export const query = createAsyncThunk<QueryData, QueryProps>(
  `${sliceName}`,
  async ({ custId }) => {
    const payload = {
      apiKey: 'customer-setting:query-member',
      data: {
        custId,
      },
    };
    const { data } = await post<QueryData>('/simple-api/query', payload);
    return data;
  },
);

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
