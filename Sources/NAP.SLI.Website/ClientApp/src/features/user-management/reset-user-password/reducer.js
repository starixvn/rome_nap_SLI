const ActionTypes = {
    OPEN_RESET_PASSWORD_MODAL: 'OPEN_RESET_PASSWORD_MODAL'
}

const initialState = { isOpen: false };

export const actions = {
    toggle: (user) => ({ type: ActionTypes.OPEN_RESET_PASSWORD_MODAL, data: { username: user.userName, custId: user.custId } })
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.OPEN_RESET_PASSWORD_MODAL:
            return {
                ...state,
                username: action.data.username,
                custId: action.data.custId,
                isOpen: !state.isOpen
            };
        default:
            return state;
    }
};