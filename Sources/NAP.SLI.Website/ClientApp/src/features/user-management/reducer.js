import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { AllGroupsId } from '../../common/utils/UserGroupUtils';
import { success, error } from '../../common/components/toast/reducer';

const slice = createSlice({
  name: 'user-management',
  initialState: {
    users: undefined
  },
  reducers: {
    queryRequest: (state) => {
      state.users = undefined;
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

export const { queryRequest, querySuccess, updateStatusRequest, updateStatusSuccess, patchUser } = slice.actions;

let queryData;
export const query = (values, callback) => async (dispatch) => {
  try {
    let data = queryData;
    if (values) {
      const groupId = parseInt(values.groupId);
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
  finally {
    callback();
  }
};

export const updateUserStatus = (data) => async (dispatch) => {
  const payload = {
    apiKey: 'user-management:update-user',
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