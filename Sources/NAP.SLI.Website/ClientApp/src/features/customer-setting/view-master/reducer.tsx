import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { handleException } from 'utils/ExceptionUtils';
import { post } from 'services/http';

type QueryProps = {
  custId: number;
  srecommend: number;
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
  maxpermatchv161: number;
  maxperballv161: number;
  minbetv164: number;
  maxbetv164: number;
  maxpermatch164: number;
  // Position Taking
  // Master Preset
  v161mpositiontaking_81: number;
  v161mpositiontaking_83: number;
  v161mpositiontaking_88: number;
  v161mpositiontaking_86: number;
  v161mlivepositiontaking_85: number;
  v161mlivepositiontaking_86: number;
  v161mlivepositiontaking_87: number;
  v161mlivepositiontaking_89: number;
  v161mlivepositiontaking_90: number;
  // Super Preset
  v161spositiontaking_81: number;
  v161spositiontaking_83: number;
  v161spositiontaking_88: number;
  v161spositiontaking_86: number;
  v161slivepositiontaking_85: number;
  v161slivepositiontaking_86: number;
  v161slivepositiontaking_87: number;
  v161slivepositiontaking_89: number;
  v161slivepositiontaking_90: number;
  // Auto Super Preset
  isauto_v161spositiontaking_81: number;
  isauto_v161spositiontaking_83: number;
  isauto_v161spositiontaking_88: number;
  isauto_v161spositiontaking_86: number;
  isauto_v161slivepositiontaking_85: number;
  isauto_v161slivepositiontaking_86: number;
  isauto_v161slivepositiontaking_87: number;
  isauto_v161slivepositiontaking_89: number;
  isauto_v161slivepositiontaking_90: number;
  auto_v161spositiontaking_81: number;
  auto_v161spositiontaking_83: number;
  auto_v161spositiontaking_88: number;
  auto_v161spositiontaking_86: number;
  auto_v161slivepositiontaking_85: number;
  auto_v161slivepositiontaking_86: number;
  auto_v161slivepositiontaking_87: number;
  auto_v161slivepositiontaking_89: number;
  auto_v161slivepositiontaking_90: number;
  // Master Max Position
  v161mpositiontaking_81_max: number;
  v161mpositiontaking_83_max: number;
  v161mpositiontaking_88_max: number;
  v161mpositiontaking_86_max: number;
  v161mlivepositiontaking_85_max: number;
  v161mlivepositiontaking_86_max: number;
  v161mlivepositiontaking_87_max: number;
  v161mlivepositiontaking_89_max: number;
  v161mlivepositiontaking_90_max: number;
  // Master Min Position
  v161mpositiontaking_81_min: number;
  v161mpositiontaking_83_min: number;
  v161mpositiontaking_88_min: number;
  v161mpositiontaking_86_min: number;
  v161mlivepositiontaking_85_min: number;
  v161mlivepositiontaking_86_min: number;
  v161mlivepositiontaking_87_min: number;
  v161mlivepositiontaking_89_min: number;
  v161mlivepositiontaking_90_min: number;
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
