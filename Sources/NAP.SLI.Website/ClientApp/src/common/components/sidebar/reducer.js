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

const queryUserInformation = username => {
	return async (dispatch) => {
		const payload = {
			apiKey: 'customer:query-user-information',
			data: {
				username: username
			}
		};

		var response = await axios.post("/simple-api/query", payload);
		dispatch({ type: "CUSTOMER::GET_SUCCESS", data: { customer: response.data[0], headline: response.data[1] } });
	};
}

export const actions = {
	toggle: () => ({ type: ActionTypes.SIDE_BAR_TOGGLE }),
	queryUsernameSuggestion,
	queryUserInformation
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
