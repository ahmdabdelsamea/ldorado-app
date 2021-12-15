import {
	INVEST_REQUEST,
	INVEST_SUCCESS,
	INVEST_FAILURE,
} from '../constants/investConstants';

export const investReducer = (state = {}, action) => {
	switch (action.type) {
		case INVEST_REQUEST:
			return { investLoading: true };
		case INVEST_SUCCESS:
			return {
				investLoading: false,
				investment: action.payload,
			};
		case INVEST_FAILURE:
			return {
				investLoading: false,
				investError: action.payload,
			};
		default:
			return state;
	}
};
