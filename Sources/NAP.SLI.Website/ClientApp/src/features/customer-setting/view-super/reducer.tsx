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
  minbetv161: number;
  maxbetv161: number;
  maxpermatch161: number;
  maxperball161: number;
  minbetv164: number;
  maxbetv164: number;
  maxpermatch164: number;
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
  // Master
  v161mpositiontaking_81: number;
  v161mpositiontaking_83: number;
  v161mpositiontaking_86: number;
  v161mpositiontaking_88: number;
  v161mlivepositiontaking_85: number;
  v161mlivepositiontaking_86: number;
  v161mlivepositiontaking_87: number;
  v161mlivepositiontaking_89: number;
  v161mlivepositiontaking_90: number;
  // Agent
  v161apositiontaking_81: number;
  v161apositiontaking_83: number;
  v161apositiontaking_86: number;
  v161apositiontaking_88: number;
  v161alivepositiontaking_85: number;
  v161alivepositiontaking_86: number;
  v161alivepositiontaking_87: number;
  v161alivepositiontaking_89: number;
  v161alivepositiontaking_90: number;
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
