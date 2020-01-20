import axios from 'axios';

const ActionTypes = {
  QUERY_REQUEST: 'USER_QUERY_REQUEST',
  QUERY_SUCCESS: 'USER_QUERY_SUCCESS',
  QUERY_FAILURE: 'USER_QUERY_FAILURE'
}

const initialState = { users: [] };

const query = (data) => {
  return async (dispatch) => {
    const payload = {
      apiKey: 'administration-query-user',
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
}

export const userActions = {
  query
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
        users: action.data.users
      };
    case ActionTypes.QUERY_FAILURE:
      return {
        ...state,
        message: action.data.message
      };
    default:
      return state;
  }
};
