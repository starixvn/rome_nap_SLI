import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { handleException } from 'utils/ExceptionUtils';
import { post } from 'services/http';

type QueryProps = {
  custId: number;
};

export type QueryData = {
  username: string;
  firstname: string;
  lastname: string;
  phone: string;
  mobilephone: string;
  fax: string;
  disableNumber: boolean;
  // Bet Setting
  minBetv161: number;
  maxBetv161: number;
  maxpermatchv161: number;
  maxperballv161: number;
  minBetv164: number;
  maxBetv164: number;
  maxpermatch164: number;
  // Position Taking
  // Agent
  v161apositiontaking_81: number;
  v161apositiontaking_83: number;
  v161apositiontaking_88: number;
  v161apositiontaking_86: number;
  v161alivepositiontaking_85: number;
  v161alivepositiontaking_86: number;
  v161alivepositiontaking_87: number;
  v161alivepositiontaking_89: number;
  v161alivepositiontaking_90: number;
  // Master
  v161mpositiontaking_81: number;
  v161mpositiontaking_83: number;
  v161mpositiontaking_88: number;
  v161mpositiontaking_86: number;
  v161mlivepositiontaking_85: number;
  v161mlivepositiontaking_86: number;
  v161mlivepositiontaking_87: number;
  v161mlivepositiontaking_89: number;
  v161mlivepositiontaking_90: number;
  // Super
  v161spositiontaking_81: number;
  v161spositiontaking_83: number;
  v161spositiontaking_88: number;
  v161spositiontaking_86: number;
  v161slivepositiontaking_85: number;
  v161slivepositiontaking_86: number;
  v161slivepositiontaking_87: number;
  v161slivepositiontaking_89: number;
  v161slivepositiontaking_90: number;
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
