import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { AllGroupsId } from '../../common/utils/UserGroupUtils';
import { success, error } from '../../common/components/toast/reducer';
import { handleException } from '../../common/utils/ExceptionUtils';
import { Dispatch } from 'react';

export type UserModel = {
  custId: number,
  userName: string,
  firstName: string,
  lastName: string,
  groupId: number
}

type Props = {
  users: UserModel[]
}

type QueryFields = {
  userName: string,
  groupId: number | undefined
}

const slice = createSlice({
  name: 'user-management',
  initialState: {} as Props,
  reducers: {
    queryRequest: (state) => {
      state.users = [];
    },
    querySuccess: (state, action) => {
      state.users = action.payload.users;
    },
    patchUser: (state, action) => {
      const { data } = action.payload;
      const user = state.users.filter(u => u.custId === data.custId)[0];
      Object.assign(user, data);
    }
  }
});

export const { queryRequest, querySuccess, patchUser } = slice.actions;

var queryData = {} as QueryFields;
export const query = (values?: UserModel, callback?: Func) => async (dispatch: Dispatch<any>) => {
  try {
    let data = queryData;
    if (values) {
      const groupId = values.groupId;
      data = {
        userName: values.userName,
        groupId: groupId === AllGroupsId ? undefined : groupId
      };
      queryData = data;
    }

    const payload = {
      apiKey: 'user-management:query-user',
      data
    };
    dispatch(queryRequest());
    const response = await axios.post('/simple-api/query', payload);
    dispatch(querySuccess({ users: response.data }));
  }
  catch (e) {
    handleException(e);
  }
  finally {
    callback && callback();
  }
};

export const updateUserStatus = (data: UserModel) => async (dispatch: Dispatch<any>) => {
  const payload = {
    apiKey: 'user-management:update-user-status',
    data
  };

  const response = await axios.post('/simple-api/command', payload);
  const { isSuccess, errMsg } = response.data;
  if (isSuccess) {
    dispatch(success('Updated successfully'));
    dispatch(patchUser({ data }));
  } else {
    dispatch(error(errMsg));
  }
};

export default slice.reducer;