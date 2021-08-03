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
  mrecommend: number;
};

export type QueryData = CustomerInfo &
  BetSetting &
  AgentPtSetting &
  MasterPtSetting & {
    // Position Taking
    // Auto Master Preset
    isauto_v161mpositiontaking_81: number;
    isauto_v161mpositiontaking_83: number;
    isauto_v161mpositiontaking_88: number;
    isauto_v161mpositiontaking_86: number;
    isauto_v161mlivepositiontaking_85: number;
    isauto_v161mlivepositiontaking_86: number;
    isauto_v161mlivepositiontaking_87: number;
    isauto_v161mlivepositiontaking_89: number;
    isauto_v161mlivepositiontaking_90: number;
    auto_v161mpositiontaking_81: number;
    auto_v161mpositiontaking_83: number;
    auto_v161mpositiontaking_88: number;
    auto_v161mpositiontaking_86: number;
    auto_v161mlivepositiontaking_85: number;
    auto_v161mlivepositiontaking_86: number;
    auto_v161mlivepositiontaking_87: number;
    auto_v161mlivepositiontaking_89: number;
    auto_v161mlivepositiontaking_90: number;
    // Agent Max Position
    v161apositiontaking_81_max: number;
    v161apositiontaking_83_max: number;
    v161apositiontaking_88_max: number;
    v161apositiontaking_86_max: number;
    v161alivepositiontaking_85_max: number;
    v161alivepositiontaking_86_max: number;
    v161alivepositiontaking_87_max: number;
    v161alivepositiontaking_89_max: number;
    v161alivepositiontaking_90_max: number;
    // Agent Min Position
    v161apositiontaking_81_min: number;
    v161apositiontaking_83_min: number;
    v161apositiontaking_88_min: number;
    v161apositiontaking_86_min: number;
    v161alivepositiontaking_85_min: number;
    v161alivepositiontaking_86_min: number;
    v161alivepositiontaking_87_min: number;
    v161alivepositiontaking_89_min: number;
    v161alivepositiontaking_90_min: number;
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
>(`${sliceName}`, async ({ custId, mrecommend }, { rejectWithValue }) => {
  try {
    const payload = {
      apiKey: 'customer-setting:query-agent',
      data: {
        custId,
        mrecommend,
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
