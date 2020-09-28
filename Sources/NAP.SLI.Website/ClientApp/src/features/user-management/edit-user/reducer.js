import axios from 'axios';

const ActionTypes = {
    OPEN_EDIT_USER: "UM::EDIT_USER_MODAL::OPEN",
    TOGGLE_EDIT_USER: "UM::EDIT_USER_MODAL::TOGGLE",
    EDIT_USER_SUCCESS: "UM::EDIT_USER::SUCCESS",
    EDIT_USER_FAILURE: "UM::EDIT_USER::FAILURE"
}

const initialState = { isOpen: false };

const updateUser = (values, callback) => {
    return async (dispatch) => {
        const payload = {
            apiKey: 'user-management:update-user',
            data: {
                custId: values.custId,
                userName: values.username,
                firstName: values.firstname ?? "",
                lastName: values.lastname ?? "",
                groupId: values.group
            }
        };

        try {
            var response = await axios.post('/simple-api/command', payload);
            if (response.data.errCode !== 0) {
                dispatch({ type: ActionTypes.EDIT_USER_FAILURE, data: { message: response.data.errMsg } });
            } else {
                dispatch({ type: ActionTypes.EDIT_USER_SUCCESS, data: { message: `Update User ${response.data.userName} successfully.` } });
                setTimeout(() => {
                    dispatch({ type: ActionTypes.TOGGLE_EDIT_USER });
                    callback();
                }, 3000);
            }

        } catch (error) {
            dispatch({ type: ActionTypes.EDIT_USER_FAILURE, data: { message: "Internal Error." } });
        }
    };
}

export const actions = {
    openEditUserModal: (user, callback) => ({ type: ActionTypes.OPEN_EDIT_USER, data: { user, callback } }),
    toggle: () => ({ type: ActionTypes.TOGGLE_EDIT_USER }),
    updateUser
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.OPEN_EDIT_USER:
            return {
                ...state,
                user: action.data.user,
                callback: action.data.callback,
                isOpen: true
            };
        case ActionTypes.TOGGLE_EDIT_USER:
            return {
                ...state,
                isOpen: !state.isOpen
            };
        case ActionTypes.EDIT_USER_SUCCESS:
            return {
                ...state,
                message: action.data.message,
                isSuccessful: true
            };
        case ActionTypes.EDIT_USER_FAILURE:
            return {
                ...state,
                message: action.data.message,
                isSuccessful: false
            };
        default:
            return state;
    }
}