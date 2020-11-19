import axios from 'axios';

const ActionTypes = {
	SIDE_BAR_TOGGLE: 'SIDE_BAR_TOGGLE'
}

const initialState = { isOpen: false };

const queryUsernameSuggestion = value => {
	return async () => {

		if (!value.length || value.length < 2) {
			return [];
		}

		const payload = {
			apiKey: 'customer:query-username-suggestion',
			data: {
				userName: value
			}
		};

		var response = await axios.post('/simple-api/query', payload);
		return response.data;
	};
}

const getCustomerInformation = username => {
	return async (dispatch) => {
		const payload = {
			username
		};

		var response = await axios.post("/api/customer/information", payload);
		if (response.data.length === 0) {
			console.log('There is no information available.');
		} else {
			dispatch({ type: "CUSTOMER::GET_SUCCESS", data: response.data });
		}
	};
}

export const actions = {
	toggle: () => ({ type: ActionTypes.SIDE_BAR_TOGGLE }),
	queryUsernameSuggestion,
	getCustomerInformation
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.SIDE_BAR_TOGGLE:
			return {
				...state,
				isOpen: !state.isOpen
			};
		default:
			return state;
	}
};
