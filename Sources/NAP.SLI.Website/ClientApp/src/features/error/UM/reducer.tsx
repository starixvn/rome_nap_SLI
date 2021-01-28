import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleException } from 'utils/ExceptionUtils';
import { post } from 'services/http';

export type UMTime = {
  from: string;
  to: string;
  isUnderMaintenanceTime: boolean;
};

const sliceName = 'um';
const initialState: UMTime = {
  from: '',
  to: '',
  isUnderMaintenanceTime: false,
};

export const checkUM = createAsyncThunk<UMTime>(
  `${sliceName}/checkUM`,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await post<UMTime>('/api/common/umtime');
      return data;
    } catch (err) {
      handleException(err);
      return rejectWithValue(err);
    }
  },
);

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    updateUM: (state, action: PayloadAction<UMTime>) => {
      state = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkUM.fulfilled, (state, { payload }) => {
      if (JSON.stringify(state) !== JSON.stringify(payload)) {
        state = payload;
      }
    });
  },
});

export const { updateUM } = slice.actions;

export default slice.reducer;
