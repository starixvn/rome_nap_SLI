import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'sidebar',
  initialState: {
    username: '',
    customer: undefined,
    message: undefined,
    isOpen: false
  },
  reducers: {
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
    getCustomerInformationRequest: (state, action) => {
      state.message = undefined;
      state.customer = undefined;
      state.username = action.payload.username;
    },
    getCustomerInformationSuccess: (state, action) => {
      state.customer = action.payload.customer;
    },
    getCustomerInformationFailure: (state, action) => {
      state.message = action.payload.message;
    },
    selectUsername: (state, action) => {
      state.customer = undefined;
      state.message = undefined;
      state.username = action.payload.username;
    }
  }
});

export const { toggle, getCustomerInformationRequest, getCustomerInformationFailure, getCustomerInformationSuccess, selectUsername } = slice.actions;

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
    dispatch(getCustomerInformationRequest({ username }));
    const payload = {
      username
    };
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