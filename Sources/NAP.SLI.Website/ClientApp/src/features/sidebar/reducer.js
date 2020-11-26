import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'sidebar',
  initialState: {
    customer: undefined,
    isOpen: false,
    isLoading: false
  },
  reducers: {
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
    getCustomerInformationRequest: (state) => {
      state.isLoading = true;
      state.customer = undefined;
    },
    getCustomerInformationSuccess: (state, action) => {
      state.isLoading = false;
      state.customer = action.payload.customer;
    },
    getCustomerInformationFailure: (state) => {
      state.isLoading = false;
      state.customer = null;
    },
  }
});

export const { toggle, getCustomerInformationRequest, getCustomerInformationSuccess } = slice.actions;

export const queryUsernameSuggestion = async (value) => {
  const payload = {
    apiKey: 'customer:query-username-suggestion',
    data: {
      userName: value
    }
  };

  const response = await axios.post('/simple-api/query', payload);
  return response.data;
}

export const getCustomerInformation = (username) => async (dispatch) => {
  const payload = {
    username
  };

  dispatch(getCustomerInformationRequest());
  const response = await axios.post("/api/customer/information", payload);
  if (response.data.length === 0) {
    dispatch(getCustomerInformationFailure());
  } else {
    dispatch(getCustomerInformationSuccess({ customer: response.data }));
  }
}

export default slice.reducer;