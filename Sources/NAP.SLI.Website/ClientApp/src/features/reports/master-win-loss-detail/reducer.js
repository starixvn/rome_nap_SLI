import axios from 'axios';

const ActionTypes = {
  WIN_LOSS_DETAIL_QUERY_REQUEST: 'WIN_LOSS_DETAIL_QUERY_REQUEST',
  WIN_LOSS_DETAIL_QUERY_SUCCESS: 'WIN_LOSS_DETAIL_QUERY_SUCCESS',
  WIN_LOSS_DETAIL_QUERY_FAILURE: 'WIN_LOSS_DETAIL_QUERY_FAILURE'
}

const initialState = { isLoading: false };

const query = (payload) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.WIN_LOSS_DETAIL_QUERY_REQUEST });

    try {
      const response = await axios.post('/simple-api/command', payload);
      dispatch({ type: ActionTypes.WIN_LOSS_DETAIL_QUERY_SUCCESS, data: response.data });
    } catch (response) {
      dispatch({ type: ActionTypes.WIN_LOSS_DETAIL_QUERY_FAILURE, data: { message: response.message } });
    }
  };
}

const showError = (message) => ({ type: ActionTypes.CHANGE_PASSWORD_FAILURE, data: { message } });

export const actions = {
  query
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.WIN_LOSS_DETAIL_QUERY_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case ActionTypes.WIN_LOSS_DETAIL_QUERY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.data
      };
    case ActionTypes.WIN_LOSS_DETAIL_QUERY_FAILURE:
      return {
        ...state,
        isLoading: false,
        isSuccessful: false,
        message: action.data.message
      };
    default:
      return state;
  }
};
