import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import {
	ADD_FUNDS_REQUEST,
	ADD_FUNDS_SUCCESS,
	ADD_FUNDS_FAILURE,
} from '../constants/addFundsConstants';
import { API_URL } from '../../utils/config';

export const addFundsAction = (values) => async (dispatch) => {
	try {
		dispatch({ type: ADD_FUNDS_REQUEST });

		const authToken = await SecureStore.getItemAsync('authToken');

		// prettier-ignore
		const config = {
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${authToken}`,
			},
		};

		const { data } = await axios.post(
			`${API_URL}` + `/create-checkout-session`,
			values,
			config
		);

		dispatch({ type: ADD_FUNDS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: ADD_FUNDS_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
