const ActionTypes = {
    GET_SUCCESS: 'CUSTOMER::GET_SUCCESS',
}

const initialState = {};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_SUCCESS:
            return {
                ...state,
                searchCustomer: action.data
            };
        default:
            return state;
    }
};
