import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { handleException } from 'utils/ExceptionUtils';
import { post } from 'services/http';

export type Customer = {
  generalInformation: GeneralInformation;
  headline: Headline;
};

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
};

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
};

type State = {
  isOpen: boolean;
  username: string;
  customer?: Customer;
  message?: string;
};

type GetCustomerInformationData = ResultData & {
  generalInformation: GeneralInformation;
  headline: Headline;
};

const sliceName = 'sidebar';

export const getCustomerInformation = createAsyncThunk<
  GetCustomerInformationData,
  string,
  {
    rejectValue: string;
  }
>(
  `${sliceName}/getCustomerInformation`,
  async (username, { rejectWithValue }) => {
    try {
      const payload = {
        username,
      };
      const { data } = await post<GetCustomerInformationData>(
        '/api/customer/information',
        payload,
      );
      const { isSuccess, errMsg } = data;
      if (isSuccess) {
        return data;
      }

      return rejectWithValue(errMsg);
    } catch (err) {
      handleException(err);
      return rejectWithValue(err.message);
    }
  },
);

const initialState: State = {
  isOpen: false,
  username: '',
};
const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
    selectUsername: (state, action) => {
      state.customer = undefined;
      state.message = undefined;
      state.username = action.payload.username;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCustomerInformation.pending, (state, { meta }) => {
      state.message = undefined;
      state.customer = undefined;
      state.username = meta.arg;
    });
    builder.addCase(getCustomerInformation.fulfilled, (state, { payload }) => {
      state.customer = payload;
    });
    builder.addCase(getCustomerInformation.rejected, (state, { payload }) => {
      state.message = payload;
    });
  },
});

export const { toggle, selectUsername } = slice.actions;

export type QueryUsernameSuggestionRecord = {
  username: string;
};
export const queryUsernameSuggestion = async (value: string) => {
  const payload = {
    apiKey: 'customer:query-username-suggestion',
    data: {
      username: value,
    },
  };

  const response = await post<Array<QueryUsernameSuggestionRecord>>(
    '/simple-api/query',
    payload,
  );
  return response.data;
};

export default slice.reducer;
