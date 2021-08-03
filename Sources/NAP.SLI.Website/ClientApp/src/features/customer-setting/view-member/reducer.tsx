import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { handleException } from 'utils/ExceptionUtils';
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
    isauto_v161mpositiontaking_mem_81: number;
    isauto_v161mpositiontaking_mem_83: number;
    isauto_v161mpositiontaking_mem_88: number;
    isauto_v161mpositiontaking_mem_86: number;
    auto_v161mpositiontaking_mem_81: number;
    auto_v161mpositiontaking_mem_83: number;
    auto_v161mpositiontaking_mem_88: number;
    auto_v161mpositiontaking_mem_86: number;
    isauto_v161mlivepositiontaking_mem_85: number;
    isauto_v161mlivepositiontaking_mem_86: number;
    isauto_v161mlivepositiontaking_mem_87: number;
    isauto_v161mlivepositiontaking_mem_89: number;
    isauto_v161mlivepositiontaking_mem_90: number;
    auto_v161mlivepositiontaking_mem_85: number;
    auto_v161mlivepositiontaking_mem_86: number;
    auto_v161mlivepositiontaking_mem_87: number;
    auto_v161mlivepositiontaking_mem_89: number;
    auto_v161mlivepositiontaking_mem_90: number;
    // Super Auto
    auto_v161spositiontaking_81: number;
    auto_v161spositiontaking_83: number;
    auto_v161spositiontaking_86: number;
    auto_v161spositiontaking_88: number;
    isauto_v161spositiontaking_mem_81: number;
    isauto_v161spositiontaking_mem_83: number;
    isauto_v161spositiontaking_mem_88: number;
    isauto_v161spositiontaking_mem_86: number;
    auto_v161slivepositiontaking_85: number;
    auto_v161slivepositiontaking_86: number;
    auto_v161slivepositiontaking_87: number;
    auto_v161slivepositiontaking_89: number;
    auto_v161slivepositiontaking_90: number;
    isauto_v161slivepositiontaking_mem_85: number;
    isauto_v161slivepositiontaking_mem_86: number;
    isauto_v161slivepositiontaking_mem_87: number;
    isauto_v161slivepositiontaking_mem_89: number;
    isauto_v161slivepositiontaking_mem_90: number;
  };

type State = {
  data: QueryData | undefined;
};

const initialState: State = {
  data: undefined,
};

const sliceName = 'customer-setting-query-member';

export const query = createAsyncThunk<
  QueryData,
  QueryProps,
  {
    rejectValue: string;
  }
>(`${sliceName}`, async ({ custId }, { rejectWithValue }) => {
  try {
    const payload = {
      apiKey: 'customer-setting:query-member',
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
