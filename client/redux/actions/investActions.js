import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import {
	INVEST_REQUEST,
	INVEST_SUCCESS,
	INVEST_FAILURE,
} from '../constants/investConstants';
import { API_URL } from '../../utils/config';

export const investAction = (id, values) => async (dispatch) => {
	try {
		dispatch({ type: INVEST_REQUEST });

		const authToken = await SecureStore.getItemAsync('authToken');

		// prettier-ignore
		const config = {
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${authToken}`,
			},
		};

		const { data } = await axios.post(
			`${API_URL}` + `/invest/${id}`,
			values,
			config
		);

		dispatch({ type: INVEST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: INVEST_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
