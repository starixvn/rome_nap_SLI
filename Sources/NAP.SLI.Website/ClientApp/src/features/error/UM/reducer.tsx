import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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
  async () => {
    const { data } = await post<UMTime>('/api/common/um');
    return data;
  },
);

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    updateUM: (state, action: PayloadAction<UMTime>) => {
      const { from, to, isUnderMaintenanceTime } = action.payload;
      state.from = from;
      state.to = to;
      state.isUnderMaintenanceTime = isUnderMaintenanceTime;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkUM.fulfilled, (state, { payload }) => {
      const { from, to, isUnderMaintenanceTime } = payload;
      state.from = from;
      state.to = to;
      state.isUnderMaintenanceTime = isUnderMaintenanceTime;
    });
  },
});

export const { updateUM } = slice.actions;

export default slice.reducer;
