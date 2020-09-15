import axios from 'axios';

const ActionTypes = {
    OPEN_ADD_EXIST_USER_MODAL: "OPEN_ADD_EXIST_USER_MODAL",
    TOGGLE_ADD_EXIST_USER_MODAL: "TOGGLE_ADD_EXIST_USER_MODAL",
    ADD_EXIST_USER_SUCCESS: "ADD_EXIST_USER_SUCCESS",
    ADD_EXIST_USER_FAILURE: "ADD_EXIST_USER_FAILURE"
};

const initialState = { isOpen: false };

const addExistUser = (values, callback) => {
    return async (dispatch) => {
        const payload = {
            apiKey: 'user-management:add-new-user',
            data: {
                userName: values.username,
                group: values.group,
                isAddNew: false
            }
        };

        try {
            var response = await axios.post('/simple-api/command', payload);
            if (response.data.errCode !== 0) {
                dispatch({ type: ActionTypes.ADD_EXIST_USER_FAILURE, data: { message: response.data.errMsg } });
            } else {
                dispatch({ type: ActionTypes.ADD_EXIST_USER_SUCCESS, data: { message: `Add User ${response.data.userName} successfully.` } });
                setTimeout(() => {
                    dispatch({ type: ActionTypes.TOGGLE_ADD_EXIST_USER_MODAL });
                    callback();
                }, 3000);
            }

        } catch (error) {
            dispatch({ type: ActionTypes.ADD_EXIST_USER_FAILURE, data: { message: "Internal Error." } });
        }
    };
}

export const actions = {
    openAddExistUserModal: (groups, callback) => ({ type: ActionTypes.OPEN_ADD_EXIST_USER_MODAL, data: { groups: groups, callback } }),
    toggle: () => ({ type: ActionTypes.TOGGLE_ADD_EXIST_USER_MODAL }),
    addExistUser
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.OPEN_ADD_EXIST_USER_MODAL:
            return {
                ...state,
                groups: action.data.groups,
                isOpen: true,
                callback: action.data.callback
            };
        case ActionTypes.TOGGLE_ADD_EXIST_USER_MODAL:
            return {
                ...state,
                isOpen: !state.isOpen
            };
        case ActionTypes.ADD_EXIST_USER_SUCCESS:
            return {
                ...state,
                message: action.data.message,
                isSuccessful: true
            };
        case ActionTypes.ADD_EXIST_USER_FAILURE:
            return {
                ...state,
                message: action.data.message,
                isSuccessful: false
            };
        default:
            return state;
    }
};