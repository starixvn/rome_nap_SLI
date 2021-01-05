import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { success, error } from '../../common/components/toast/reducer';
import { handleException } from '../../common/utils/ExceptionUtils';
import { post } from '../../common/services/http';
import store from '../../store';

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
  username: string;
  groupId?: number;
  users: Array<UserModel>;
};

export type QueryProps = {
  username: string;
  groupId?: number;
};

const initialState: State = {
  username: '',
  groupId: undefined,
  users: []
};

type PatchUserAction = {
  data: {
    custId: number;
  };
}

const slice = createSlice({
  name: 'user-management',
  initialState,
  reducers: {
    queryRequest: (state, action: PayloadAction<QueryProps>) => {
      const { username, groupId } = action.payload;
      state.username = username;
      state.groupId = groupId;
      state.users = [];
    },
    querySuccess: (state, action: PayloadAction<{ users: Array<UserModel> }>) => {
      const { users } = action.payload;
      state.users = users;
    },
    patchUser: (state, action: PayloadAction<PatchUserAction>) => {
      const { data } = action.payload;
      const user = state.users.filter(u => u.custId === data.custId)[0];
      Object.assign(user, data);
    }
  }
});

export const { queryRequest, querySuccess, patchUser } = slice.actions;

export const query = (values?: QueryProps, callback: Func = () => { }) => async (dispatch: AppDispatch) => {
  try {
    let data = values;
    if (!data) {
      const rootState: RootState = store.getState();
      const { username, groupId } = rootState.userManagement;
      data = {
        username,
        groupId
      };
    }

    const payload = {
      apiKey: 'user-management:query-user',
      data
    };
    dispatch(queryRequest({ ...data }));
    const response = await post<Array<UserModel>>('/simple-api/query', payload);
    const users = response.data;
    dispatch(querySuccess({ users }));
  }
  catch (e) {
    handleException(e);
  }
  finally {
    callback();
  }
};

type UpdateUserStatusRequest = {
  custId: number;
  closed: boolean;
};

export const updateUserStatus = (data: UpdateUserStatusRequest) => async (dispatch: AppDispatch) => {
  const payload = {
    apiKey: 'user-management:update-user-status',
    data
  };

  const response = await post<ResultData>('/simple-api/command', payload);
  const { isSuccess, errMsg } = response.data;
  if (isSuccess) {
    dispatch(success('Updated successfully'));
    dispatch(patchUser({ data }));
  } else {
    dispatch(error(errMsg));
  }
};

export default slice.reducer;