import axios from 'axios';
const CryptoJS = require('../../../common/libs/CryptoJS');

const ActionTypes = {
    OPEN_RESET_PASSWORD_MODAL: 'OPEN_RESET_PASSWORD_MODAL',
    TOGGLE_RESET_PASSWORD_MODAL: 'TOGGLE_RESET_PASSWORD_MODAL',
    RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS',
    RESET_PASSWORD_FAILURE: 'RESET_PASSWORD_FAILURE'
}

const initialState = { isOpen: false, custId: 0, username: "" };

const handleSubmit = (values) => {
    return async (dispatch) => {
        const payload = {
            apiKey: 'user-management:update-user',
            data: {
                custId: values.custId,
                userPwd: CryptoJS.CfsEnCode(values.newPassword)
            }
        };

        try {
            var response = await axios.post('/simple-api/command', payload);
            if (response.data.errCode !== 0) {
                dispatch({ type: ActionTypes.RESET_PASSWORD_FAILURE, data: { message: response.data.errMsg } });
            } else {
                dispatch({ type: ActionTypes.RESET_PASSWORD_SUCCESS, data: { message: 'Password reset successfully.' } });
                setTimeout(() => {
                    dispatch({ type: ActionTypes.TOGGLE_RESET_PASSWORD_MODAL })
                }, 3000);
            }

        } catch (error) {
            dispatch({ type: ActionTypes.RESET_PASSWORD_FAILURE, data: { message: "Internal Error." } });
        }
    };
}

export const actions = {
    open: (user) => ({ type: ActionTypes.OPEN_RESET_PASSWORD_MODAL, data: { username: user.userName, custId: user.custId } }),
    toggle: () => ({ type: ActionTypes.TOGGLE_RESET_PASSWORD_MODAL }),
    handleSubmit
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.OPEN_RESET_PASSWORD_MODAL:
            return {
                ...state,
                username: action.data.username,
                custId: action.data.custId,
                message: undefined,
                isOpen: true
            };
        case ActionTypes.TOGGLE_RESET_PASSWORD_MODAL:
            return {
                ...state,
                isOpen: !state.isOpen
            };
        case ActionTypes.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                message: action.data.message,
                isSuccessful: true
            };
        case ActionTypes.RESET_PASSWORD_FAILURE:
            return {
                ...state,
                message: action.data.message,
                isSuccessful: false
            };
        default:
            return state;
    }
};