const ActionTypes = {
    CLOSE_CONFIRM_BOX: "CLOSE_CONFIRM_BOX",
    OPEN_CONFIRM_BOX: "OPEN_CONFIRM_BOX"
}

const closeConfirmBox = () => ({ type: ActionTypes.CLOSE_CONFIRM_BOX });

const initialState = {
    isOpen: false,
    title: "",
    message: "",
    submitText: "Yes",
    cancelText: "No",
    callback: closeConfirmBox
};

const openConfirmBox = (title, message, callback, submitText = "Yes", cancelText = "No") => {
    return (dispatch) => {
        var data = {
            isOpen: true,
            title,
            message,
            callback,
            submitText,
            cancelText
        };

        dispatch({ type: ActionTypes.OPEN_CONFIRM_BOX, data: data });
    };
}


export const actions = {
    openConfirmBox,
    closeConfirmBox
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.OPEN_CONFIRM_BOX:
            return action.data;
        case ActionTypes.CLOSE_CONFIRM_BOX:
            return initialState;
        default:
            return state;
    }
} 