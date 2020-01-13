const ActionTypes = {
  CHANGE_PASSWORD_TOGGLE_MODAL: 'CHANGE_PASSWORD_TOGGLE_MODAL',
  CHANGE_PASSWORD_REQUEST: 'CHANGE_PASSWORD_REQUEST',
  CHANGE_PASSWORD_SUCCESS: 'CHANGE_PASSWORD_SUCCESS',
  CHANGE_PASSWORD_FAILURE: 'CHANGE_PASSWORD_FAILURE'
}

const initialState = { isOpen: false };

export const passwordActions = {
  toggleModal: () => ({ type: ActionTypes.CHANGE_PASSWORD_TOGGLE_MODAL }),
  changePassword: () => ({ type: ActionTypes.CHANGE_PASSWORD_REQUEST })
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_PASSWORD_TOGGLE_MODAL:
      return {
        ...state,
        isOpen: !state.isOpen
      };
    case ActionTypes.CHANGE_PASSWORD_REQUEST:
      return {
        ...state
      };
    case ActionTypes.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state
      };
    case ActionTypes.CHANGE_PASSWORD_FAILURE:
      return {
        ...state
      };
    default:
      return state;
  }
};
