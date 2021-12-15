import {
	ADD_FUNDS_REQUEST,
	ADD_FUNDS_SUCCESS,
	ADD_FUNDS_FAILURE,
} from '../constants/addFundsConstants';

export const addFundsReducer = (state = {}, action) => {
	switch (action.type) {
		case ADD_FUNDS_REQUEST:
			return { fundLoading: true };
		case ADD_FUNDS_SUCCESS:
			return { fundLoading: false, sessionUrl: action.payload };
		case ADD_FUNDS_FAILURE:
			return { fundLoading: false, fundError: action.payload };
		default:
			return state;
	}
};
