import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleException } from '../../common/utils/ExceptionUtils';
import { post } from '../../common/services/http';

export type Customer = {
  generalInformation: GeneralInformation;
  headline: Headline;
}

type GeneralInformation = {
  custId: number;
  username: string;
  firstName: string;
  lastName: string;
  username2: string;
  roleId: number;
  enabled: boolean;
  phone: string;
  mobilePhone: string;
  fax: string;
  site: string;
}

type Headline = {
  memberId: number;
  memberName: string;
  agentId: number;
  agentName: string;
  agentEnabled: boolean;
  masterId: number;
  masterName: string;
  masterEnabled: boolean;
  superId: number;
  superName: string;
  superEnabled: boolean;
}

type State = {
  isOpen: boolean;
  username: string;
  customer?: Customer;
  message?: string;
};

const initialState: State = {
  isOpen: false,
  username: ''
};
const slice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
    getCustomerInformationRequest: (state, action: PayloadAction<{ username: string }>) => {
      state.message = undefined;
      state.customer = undefined;
      state.username = action.payload.username;
    },
    getCustomerInformationSuccess: (state, action: PayloadAction<{ customer: Customer }>) => {
      state.customer = action.payload.customer;
    },
    getCustomerInformationFailure: (state, action: PayloadAction<{ message: string }>) => {
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

export type QueryUsernameSuggestionRecord = {
  username: string
};
export const queryUsernameSuggestion = async (value: string) => {
  const payload = {
    apiKey: 'customer:query-username-suggestion',
    data: {
      username: value
    }
  };

  const response = await post<Array<QueryUsernameSuggestionRecord>>('/simple-api/query', payload);
  return response.data;
}

type GetCustomerInformationData = ResultData & {
  generalInformation: GeneralInformation;
  headline: Headline;
};
export const getCustomerInformation = (username: string, callback: Func) => async (dispatch: any) => {
  try {
    dispatch(getCustomerInformationRequest({ username }));
    const payload = {
      username
    };
    const response = await post<GetCustomerInformationData>("/api/customer/information", payload);
    const { isSuccess, errMsg, generalInformation, headline } = response.data;
    if (isSuccess) {
      const customer = {
        generalInformation,
        headline
      };
      dispatch(getCustomerInformationSuccess({ customer }));
    } else {
      dispatch(getCustomerInformationFailure({ message: errMsg }));
    }
  }
  catch (e) {
    handleException(e);
  }
  finally {
    callback();
  }
}

export default slice.reducer;