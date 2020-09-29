import axios from 'axios';

const ActionTypes = {
	SIDE_BAR_TOGGLE: 'SIDE_BAR_TOGGLE'
}

const initialState = { isOpen: false };

const queryUsername = value => {
	return async () => {

		if (!value.length || value.length < 2) {
			return [];
		}

		const payload = {
			apiKey: 'customer:query-username',
			data: {
				userName: value
			}
		};

		try {
			var response = await axios.post('/simple-api/query', payload);
			var result = [];
			response.data.forEach(user => {
				result.push({ value: user.username, label: user.username });
			});

			return result;
		} catch {
			return [];
		}
	};
}

const searchUsername = username => {
	return async (dispatch) => {
		const payload = {
			apiKey: 'customer:query-multiple-cust-by-username',
			data: {
				username: username
			}
		};

		try {
			var response = await axios.post("/simple-api/queryMultiple", payload);
			if (response.status === 200) {
				dispatch({ type: "CUSTOMER::GET_SUCCESS", data: { customer: response.data.item1[0], headline: response.data.item2[0] } });
			}

		} catch (error) {
			console.log(error);
		}
	};
}

export const actions = {
	toggle: () => ({ type: ActionTypes.SIDE_BAR_TOGGLE }),
	queryUsername,
	searchUsername
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
