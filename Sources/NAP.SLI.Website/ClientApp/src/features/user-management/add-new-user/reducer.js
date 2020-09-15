import axios from 'axios';
const CryptoJS = require('../../../common/libs/CryptoJS');

const ActionTypes = {
    OPEN_ADD_NEW_USER_MODAL: 'OPEN_ADD_NEW_USER_MODAL',
    TOGGLE_ADD_NEW_USER_MODAL: 'TOGGLE_ADD_NEW_USER_MODAL',
    ADD_NEW_USER_SUCCESS: 'ADD_NEW_USER_SUCCESS',
    ADD_NEW_USER_FAILURE: 'ADD_NEW_USER_FAILURE'
}

const initialState = { isOpen: false, groups: [] };

const addNewUser = (values, callback) => {
    return async (dispatch) => {
        const payload = {
            apiKey: 'user-management:add-new-user',
            data: {
                userName: values.username,
                userPwd: CryptoJS.CfsEnCode(values.password),
                firstName: values.firstname ?? "",
                lastName: values.lastname ?? "",
                groupId: values.group,
                isAddNew: true
            }
        };

        try {
            var response = await axios.post('/simple-api/command', payload);
            if (response.data.errCode !== 0) {
                dispatch({ type: ActionTypes.ADD_NEW_USER_FAILURE, data: { message: response.data.errMsg } });
            } else {
                dispatch({ type: ActionTypes.ADD_NEW_USER_SUCCESS, data: { message: `Add User ${response.data.userName} successfully.` } });
                setTimeout(() => {
                    dispatch({ type: ActionTypes.TOGGLE_ADD_NEW_USER_MODAL });
                    callback();
                }, 3000);
            }

        } catch (error) {
            dispatch({ type: ActionTypes.ADD_NEW_USER_FAILURE, data: { message: "Internal Error." } });
        }
    };
}

export const actions = {
    openAddNewUserModal: (groups, callback) => ({ type: ActionTypes.OPEN_ADD_NEW_USER_MODAL, data: { groups: groups, callback } }),
    toggle: () => ({ type: ActionTypes.TOGGLE_ADD_NEW_USER_MODAL }),
    addNewUser
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.OPEN_ADD_NEW_USER_MODAL:
            return {
                groups: action.data.groups,
                message: undefined,
                isOpen: true,
                callback: action.data.callback
            };
        case ActionTypes.TOGGLE_ADD_NEW_USER_MODAL:
            return {
                isOpen: !state.isOpen
            };
        case ActionTypes.ADD_NEW_USER_SUCCESS:
            return {
                ...state,
                message: action.data.message,
                isSuccessful: true
            };
        case ActionTypes.ADD_NEW_USER_FAILURE:
            return {
                ...state,
                message: action.data.message,
                isSuccessful: false
            };
        default:
            return state;
    }
};