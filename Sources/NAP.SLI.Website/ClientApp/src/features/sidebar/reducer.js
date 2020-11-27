import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'sidebar',
  initialState: {
    customer: undefined,
    message: undefined,
    isOpen: false
  },
  reducers: {
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
    getCustomerInformationRequest: (state) => {
      state.message = undefined;
      state.customer = undefined;
    },
    getCustomerInformationSuccess: (state, action) => {
      state.customer = action.payload.customer;
    },
    getCustomerInformationFailure: (state, action) => {
      state.message = action.payload.message;
    },
  }
});

export const { toggle, getCustomerInformationRequest, getCustomerInformationFailure, getCustomerInformationSuccess } = slice.actions;

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

export const getCustomerInformation = (username, callback) => async (dispatch) => {
  try {
    const payload = {
      username
    };
    dispatch(getCustomerInformationRequest());
    const response = await axios.post("/api/customer/information", payload);
    const { isSuccess, errMsg, generalInformation, headline } = response.data;
    if (isSuccess) {
      dispatch(getCustomerInformationSuccess({
        customer: {
          generalInformation,
          headline
        }
      }));
    } else {
      dispatch(getCustomerInformationFailure({ message: errMsg }));
    }
  }
  finally {
    callback();
  }
}

export default slice.reducer;