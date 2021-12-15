import {
	PROPERTY_LIST_REQUEST,
	PROPERTY_LIST_SUCCESS,
	PROPERTY_LIST_FAILURE,
	PROPERTY_DETAILS_REQUEST,
	PROPERTY_DETAILS_SUCCESS,
	PROPERTY_DETAILS_FAILURE,
} from '../constants/propertyConstants';

export const propertyListReducer = (state = { properties: [] }, action) => {
	switch (action.type) {
		case PROPERTY_LIST_REQUEST:
			return { loading: true, properties: [] };
		case PROPERTY_LIST_SUCCESS:
			return { loading: false, properties: action.payload };
		case PROPERTY_LIST_FAILURE:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const propertyDetailsReducer = (
	state = { property: { files: [] } },
	action
) => {
	switch (action.type) {
		case PROPERTY_DETAILS_REQUEST:
			return { loading: true, ...state };
		case PROPERTY_DETAILS_SUCCESS:
			return { loading: false, property: action.payload };
		case PROPERTY_DETAILS_FAILURE:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
