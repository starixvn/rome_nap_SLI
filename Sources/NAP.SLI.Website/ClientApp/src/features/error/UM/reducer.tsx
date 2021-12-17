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
    const { data } = await post<UMTime>('/api/common/umtime');
    return data;
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
