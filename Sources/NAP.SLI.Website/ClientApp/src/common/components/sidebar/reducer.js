import axios from 'axios';

const ActionTypes = {
  SIDE_BAR_TOGGLE: 'SIDE_BAR_TOGGLE'
}

const initialState = { isOpen: false };

const queryUsername = value => {
  return async () => {
    const payload = {
      apiKey: 'customer:query-username',
      data: {
        userName: value
      }
    };

    try {
      var response = await axios.post('/simple-api/query', payload);
      var result = [];
      response.data.forEach(user => {
        result.push({ value: user.username, label: user.username });
      });

      return result;
    } catch {
      return [];
    }
  };
}

export const actions = {
  toggle: () => ({ type: ActionTypes.SIDE_BAR_TOGGLE }),
  queryUsername
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SIDE_BAR_TOGGLE:
      return {
        ...state,
        isOpen: !state.isOpen
      };
    default:
      return state;
  }
};
