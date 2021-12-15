import {
	DASHBOARD_DETAILS_REQUEST,
	DASHBOARD_DETAILS_SUCCESS,
	DASHBOARD_DETAILS_FAILURE,
} from '../constants/dashboardConstants';

export const dashboardDetailsReducer = (
	state = { dashboard: { investedInProperties: [], listedProperties: [] } },
	action
) => {
	switch (action.type) {
		case DASHBOARD_DETAILS_REQUEST:
			return { loading: true, ...state };
		case DASHBOARD_DETAILS_SUCCESS:
			return { loading: false, dashboard: action.payload };
		case DASHBOARD_DETAILS_FAILURE:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
