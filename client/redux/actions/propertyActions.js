import axios from 'axios';
import {
	PROPERTY_LIST_REQUEST,
	PROPERTY_LIST_SUCCESS,
	PROPERTY_LIST_FAILURE,
	PROPERTY_DETAILS_REQUEST,
	PROPERTY_DETAILS_SUCCESS,
	PROPERTY_DETAILS_FAILURE,
} from '../constants/propertyConstants';
import { API_URL } from '../../utils/config';

export const listProperty = () => async (dispatch) => {
	try {
		dispatch({ type: PROPERTY_LIST_REQUEST });

		const { data } = await axios.get(`${API_URL}` + `/invest`);

		dispatch({ type: PROPERTY_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PROPERTY_LIST_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listPropertyDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: PROPERTY_DETAILS_REQUEST });

		const { data } = await axios.get(`${API_URL}` + `/invest/${id}`);

		dispatch({ type: PROPERTY_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PROPERTY_DETAILS_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
