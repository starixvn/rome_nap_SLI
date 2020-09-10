const ActionTypes = {
    OPEN_EDIT_USER: "OPEN_EDIT_USER",
    TOGGLE_EDIT_USER: "TOGGLE_EDIT_USER",
    EDIT_USER_SUCCESS: "EDIT_USER_SUCCESS",
    EDIT_USER_FAILURE: "EDIT_USER_FAILURE"
}

const initialState = { isOpen: false };

export const actions = {
    openEditUserModal: (user) => ({ type: ActionTypes.OPEN_EDIT_USER, data: { user: user } }),
    toggle: () => ({ type: ActionTypes.TOGGLE_EDIT_USER })
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.OPEN_EDIT_USER:
            return {
                ...state,
                user: action.data.user,
                isOpen: true
            };
        case ActionTypes.TOGGLE_EDIT_USER:
            return {
                ...state,
                isOpen: !state.isOpen
            };
        default:
            return state;
    }
}