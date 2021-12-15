import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import {
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAILURE,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAILURE,
	USER_LOGOUT,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAILURE,
} from '../constants/userConstants';
import { API_URL } from '../../utils/config';

export const register = (values) => async (dispatch) => {
	try {
		dispatch({ type: USER_REGISTER_REQUEST });

		const config = {
			headers: {
				// prettier-ignore
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.post(
			`${API_URL}` + `/register`,
			values,
			config
		);

		dispatch({ type: USER_REGISTER_SUCCESS, payload: data.token });

		dispatch({ type: USER_LOGIN_SUCCESS, payload: data.token });

		await SecureStore.setItemAsync('authToken', data.token);
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const login = (values) => async (dispatch) => {
	try {
		dispatch({ type: USER_LOGIN_REQUEST });

		const config = {
			headers: {
				// prettier-ignore
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.post(`${API_URL}` + `/login`, values, config);

		dispatch({ type: USER_LOGIN_SUCCESS, payload: data.token });

		await SecureStore.setItemAsync('authToken', data.token);
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const logout = () => async (dispatch) => {
	try {
		await SecureStore.setItemAsync('authToken', null);
		dispatch({ type: USER_LOGOUT });
	} catch (error) {
		console.log(error);
	}
};

export const forgotPasswordAction = (values) => async (dispatch) => {
	try {
		dispatch({ type: FORGOT_PASSWORD_REQUEST });

		const config = {
			headers: {
				// prettier-ignore
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.post(`${API_URL}` + `/forgot`, values, config);

		dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: FORGOT_PASSWORD_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
