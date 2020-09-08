const ActionTypes = {
  SIDE_BAR_TOGGLE: 'SIDE_BAR_TOGGLE'
}

const initialState = { isOpen: false };

export const actions = {
  toggle: () => ({ type: ActionTypes.SIDE_BAR_TOGGLE })
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
