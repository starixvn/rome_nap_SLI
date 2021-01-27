import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import produce from 'immer';
import { handleException } from 'utils/ExceptionUtils';
import { post } from 'services/http';

export type UserModel = {
  custId: number;
  userName: string;
  firstName: string;
  lastName: string;
  groupId: number;
  creator: string;
  createdDate: string;
  closed: boolean;
};

type State = {
  queryArg: QueryProps;
  users?: Array<UserModel>;
};

export type QueryProps = {
  username: string;
  groupId?: number;
};

type PatchUserAction = {
  data: {
    custId: number;
  };
};

type UpdateUserStatusProps = {
  custId: number;
  closed: boolean;
};

const initialState: State = {
  queryArg: {
    username: '',
    groupId: undefined,
  },
  users: undefined,
};
const sliceName = 'user-management';

export const query = createAsyncThunk<Array<UserModel>, QueryProps>(
  `${sliceName}/query`,
  async (values, { rejectWithValue }) => {
    try {
      const payload = {
        apiKey: 'user-management:query-user',
        data: values,
      };
      const response = await post<Array<UserModel>>(
        '/simple-api/query',
        payload,
      );
      return response.data;
    } catch (err) {
      handleException(err);
      return rejectWithValue(err);
    }
  },
);

export const updateUserStatus = createAsyncThunk<
  ResultData,
  UpdateUserStatusProps
>(`${sliceName}/add`, async (values, { rejectWithValue }) => {
  try {
    const payload = {
      apiKey: 'user-management:update-user-status',
      data: values,
    };

    const response = await post<ResultData>('/simple-api/command', payload);
    return response.data;
  } catch (err) {
    handleException(err);
    return rejectWithValue(err);
  }
});

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    patchUser: (state, action: PayloadAction<PatchUserAction>) => {
      const { data } = action.payload;
      if (state.users) {
        state.users = produce(state.users, (users) => {
          const user = users.filter((u) => u.custId === data.custId)[0];
          Object.assign(user, data);
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(query.pending, (state, { meta }) => {
      state.queryArg = meta.arg;
      state.users = [];
    });
    builder.addCase(query.fulfilled, (state, { payload }) => {
      state.users = payload;
    });
  },
});

export const { patchUser } = slice.actions;

export default slice.reducer;
