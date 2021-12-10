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
    // Auto Master Preset
    isAuto_v161mPositionTaking_81: number;
    isAuto_v161mPositionTaking_83: number;
    isAuto_v161mPositionTaking_88: number;
    isAuto_v161mPositionTaking_86: number;
    isAuto_v161mLivePositionTaking_85: number;
    isAuto_v161mLivePositionTaking_86: number;
    isAuto_v161mLivePositionTaking_87: number;
    isAuto_v161mLivePositionTaking_89: number;
    isAuto_v161mLivePositionTaking_90: number;
    auto_v161mPositionTaking_81: number;
    auto_v161mPositionTaking_83: number;
    auto_v161mPositionTaking_88: number;
    auto_v161mPositionTaking_86: number;
    auto_v161mLivePositionTaking_85: number;
    auto_v161mLivePositionTaking_86: number;
    auto_v161mLivePositionTaking_87: number;
    auto_v161mLivePositionTaking_89: number;
    auto_v161mLivePositionTaking_90: number;
    // Agent Max Position
    v161aPositionTaking_81_Max: number;
    v161aPositionTaking_83_Max: number;
    v161aPositionTaking_88_Max: number;
    v161aPositionTaking_86_Max: number;
    v161aLivePositionTaking_85_Max: number;
    v161aLivePositionTaking_86_Max: number;
    v161aLivePositionTaking_87_Max: number;
    v161aLivePositionTaking_89_Max: number;
    v161aLivePositionTaking_90_Max: number;
    // Agent Min Position
    v161aPositionTaking_81_Min: number;
    v161aPositionTaking_83_Min: number;
    v161aPositionTaking_88_Min: number;
    v161aPositionTaking_86_Min: number;
    v161aLivePositionTaking_85_Min: number;
    v161aLivePositionTaking_86_Min: number;
    v161aLivePositionTaking_87_Min: number;
    v161aLivePositionTaking_89_Min: number;
    v161aLivePositionTaking_90_Min: number;
  };

type State = {
  data: QueryData | undefined;
};

const initialState: State = {
  data: undefined,
};

const sliceName = 'customer-setting-query-agent';

export const query = createAsyncThunk<
  QueryData,
  QueryProps,
  {
    rejectValue: string;
  }
>(`${sliceName}`, async ({ custId }, { rejectWithValue }) => {
  try {
    const payload = {
      apiKey: 'customer-setting:query-agent',
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
