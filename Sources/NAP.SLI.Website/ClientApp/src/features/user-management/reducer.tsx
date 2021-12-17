import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import produce from 'immer';
import { post } from 'services/http';

export type UserModel = {
  userId: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  creator: string;
  createdDate: string;
};

type State = {
  isQuerying: boolean;
  queryArg: QueryProps;
  users?: UserModel[];
};

export type QueryProps = {
  username: string;
};

type PatchUserAction = {
  data: {
    custId: number;
  };
};

const initialState: State = {
  isQuerying: false,
  queryArg: {
    username: '',
  },
  users: undefined,
};
const sliceName = 'user-management';

export const query = createAsyncThunk<UserModel[], QueryProps>(
  `${sliceName}/query`,
  async (values) => {
    const { data } = await post<UserModel[]>(
      '/api/user-management/query',
      values,
    );
    return data;
  },
);

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    patchUser: (state, action: PayloadAction<PatchUserAction>) => {
      const { data } = action.payload;
      if (state.users) {
        state.users = produce(state.users, (users) => {
          const user = users.filter((u) => u.userId === data.custId)[0];
          Object.assign(user, data);
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(query.pending, (state, { meta }) => {
      state.queryArg = meta.arg;
      state.isQuerying = true;
      state.users = undefined;
    });
    builder.addCase(query.fulfilled, (state, { payload }) => {
      state.isQuerying = false;
      state.users = payload;
    });
  },
});

export const { patchUser } = slice.actions;

export default slice.reducer;
