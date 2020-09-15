import axios from 'axios';

const ActionTypes = {
  QUERY_REQUEST: 'USER_MANAGEMENT_QUERY_REQUEST',
  QUERY_SUCCESS: 'USER_MANAGEMENT_QUERY_SUCCESS',
  QUERY_FAILURE: 'USER_MANAGEMENT_QUERY_FAILURE',
  UPDATE_STATUS_SUCCESS: 'USER_MANAGEMENT_UPDATE_STATUS_SUCCESS',
  UPDATE_STATUS_FAILURE: 'USER_MANAGEMENT_UPDATE_STATUS_FAILURE',
  CHANGE_PASSWORD_SUCCESS: 'CHANGE_USER_PASSWORD_SUCCESS',
  CHANGE_PASSWORD_FAILURE: 'CHANGE_USER_PASSWORD_FAILURE'
}

const initialState = { users: [], isOpen: false, queryParams: {username: '', groupOption: null} };

const query = (data) => {
  return async (dispatch) => {
    const payload = {
      apiKey: 'user-management:query-user',
      data
    };
    dispatch({ type: ActionTypes.QUERY_REQUEST, data });

    try {
      const response = await axios.post('/simple-api/query', payload);
      dispatch({ type: ActionTypes.QUERY_SUCCESS, data: { users: response.data } });
    } catch (response) {
      dispatch({ type: ActionTypes.QUERY_FAILURE, data: { message: response.data } });
    }
  };
};

const changeUserStatus = (status, user) => {
  return async (dispatch) => {
    const payload = {
      apiKey: 'user-management:update-user',
      data: {
        custId: user.custId,
        closed: !status
      }
    };

    try {
      await axios.post('/simple-api/command', payload);
      dispatch({ type: ActionTypes.UPDATE_STATUS_SUCCESS, data: { userId: user.custId, status } });
    } catch (error) {
      dispatch({ type: ActionTypes.UPDATE_STATUS_FAILURE, data: { message: error.data } });
    }
  };
};

export const actions = {
  query,
  changeUserStatus
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.QUERY_REQUEST:
      return {
        ...state,
        payload: action.data.payload
      };
    case ActionTypes.QUERY_SUCCESS:
      return {
        ...state,
        message: null,
        users: action.data.users
      };
    case ActionTypes.QUERY_FAILURE:
      return {
        ...state,
        message: action.data.message,
        isSuccessful: false
      };
    case ActionTypes.UPDATE_STATUS_SUCCESS:
      return {
        ...state,
        message: 'Update Success!',
        isSuccessful: true
      };
    case ActionTypes.UPDATE_STATUS_FAILURE:
      return {
        ...state,
        message: 'Update Failed!',
        isSuccessful: false
      };
    default:
      return state;
  }
};
