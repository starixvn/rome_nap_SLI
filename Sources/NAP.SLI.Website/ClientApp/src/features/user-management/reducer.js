import axios from 'axios';

const ActionTypes = {
  USER_MANAGEMENT_QUERY_REQUEST: 'USER_MANAGEMENT_QUERY_REQUEST',
  USER_MANAGEMENT_QUERY_SUCCESS: 'USER_MANAGEMENT_QUERY_SUCCESS',
  USER_MANAGEMENT_QUERY_FAILURE: 'USER_MANAGEMENT_QUERY_FAILURE'
}

const initialState = { users: [] };

const query = (data) => {
  return async (dispatch) => {
    const payload = {
      apiKey: 'user-management:query-user',
      data
    };
    dispatch({ type: ActionTypes.USER_MANAGEMENT_QUERY_REQUEST, data });

    try {
      const response = await axios.post('/simple-api/query', payload);
      dispatch({ type: ActionTypes.USER_MANAGEMENT_QUERY_SUCCESS, data: { users: response.data } });
    } catch (response) {
      dispatch({ type: ActionTypes.USER_MANAGEMENT_QUERY_FAILURE, data: { message: response.data } });
    }
  };
}

export const actions = {
  query
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.USER_MANAGEMENT_QUERY_REQUEST:
      return {
        ...state,
        payload: action.data.payload
      };
    case ActionTypes.USER_MANAGEMENT_QUERY_SUCCESS:
      return {
        ...state,
        users: action.data.users
      };
    case ActionTypes.USER_MANAGEMENT_QUERY_FAILURE:
      return {
        ...state,
        message: action.data.message
      };
    default:
      return state;
  }
};
