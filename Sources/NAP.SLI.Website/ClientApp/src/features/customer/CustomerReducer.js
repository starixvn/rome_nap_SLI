const ActionTypes = {
    GET_SUCCESS: 'CUSTOMER::GET_SUCCESS',
}

const initialState = { customer: null };

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_SUCCESS:
            return {
                ...state,
                customer: action.data.customer,
                headline: action.data.headline
            };
        default:
            return state;
    }
};
