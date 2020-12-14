import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { RouteLinks } from '../../common/utils/RouteUtils';
import { History } from 'history';
import { SidebarState } from './SideBar';

type Callback = () => void;

const slice = createSlice({
  name: 'sidebar',
  initialState: {
    username: '',
    customer: undefined,
    message: undefined,
    isOpen: false
  },
  reducers: {
    toggle: (state: SidebarState) => {
      state.isOpen = !state.isOpen;
    },
    getCustomerInformationRequest: (state: SidebarState, action) => {
      state.message = undefined;
      state.customer = undefined;
      state.username = action.payload.username;
    },
    getCustomerInformationSuccess: (state: SidebarState, action) => {
      state.customer = action.payload.customer || undefined;
    },
    getCustomerInformationFailure: (state: SidebarState, action) => {
      state.message = action.payload.message;
    },
    selectUsername: (state: SidebarState, action) => {
      state.customer = undefined;
      state.message = undefined;
      state.username = action.payload.username;
    }
  }
});

export const { toggle, getCustomerInformationRequest, getCustomerInformationFailure, getCustomerInformationSuccess, selectUsername } = slice.actions;

export const queryUsernameSuggestion = async (value: string) => {
  const payload = {
    apiKey: 'customer:query-username-suggestion',
    data: {
      userName: value
    }
  };

  const response = await axios.post('/simple-api/query', payload);
  return response.data;
}

export const getCustomerInformation = (username: string, history: History, callback: Callback) => async (dispatch: any) => {
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
      history.push(RouteLinks.INDEX);
    } else {
      dispatch(getCustomerInformationFailure({ message: errMsg }));
    }
  }
  finally {
    callback();
  }
}

export default slice.reducer;