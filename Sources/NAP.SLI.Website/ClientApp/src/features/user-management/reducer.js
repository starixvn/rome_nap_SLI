import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'sidebar',
  initialState: {
    users: undefined,
    isOpen: false,
    isLoading: false,
    queryParams:
      { username: '', groupOption: null }
  },
  reducers: {
    queryRequest: (state) => {
      state.isLoading = true;
      state.users = undefined;
    },
    querySuccess: (state, action) => {
      state.isLoading = false;
      state.users = action.payload.users;
    },
    updateStatusRequest: (state) => {
      state.isLoading = true;
      state.users = undefined;
    },
    updateStatusSuccess: (state, action) => {
      state.isLoading = false;
      state.users = action.payload.users;
    },
  }
});

export const { queryRequest, querySuccess, updateStatusRequest, updateStatusSuccess } = slice.actions;

export const query = (data) => async (dispatch) => {
  const payload = {
    apiKey: 'user-management:query-user',
    data
  };
  dispatch(queryRequest());
  const response = await axios.post('/simple-api/query', payload);
  dispatch(querySuccess({ users: response.data }));
};

export const changeUserStatus = (status, user) => async (dispatch) => {
  const payload = {
    apiKey: 'user-management:update-user',
    data: {
      custId: user.custId,
      closed: !status
    }
  };

  dispatch(updateStatusRequest());
  await axios.post('/simple-api/command', payload);
  dispatch(updateStatusSuccess({ userId: user.custId, status }));
};

export default slice.reducer;