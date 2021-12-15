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

export const userRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return { ...state, loading: true };
		case USER_REGISTER_SUCCESS:
			return { ...state, loading: false, authToken: action.payload };
		case USER_REGISTER_FAILURE:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

export const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { ...state, loading: true };
		case USER_LOGIN_SUCCESS:
			return { ...state, loading: false, authToken: action.payload };
		case USER_LOGIN_FAILURE:
			return { ...state, loading: false, error: action.payload };
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};

export const forgotPasswordReducer = (state = {}, action) => {
	switch (action.type) {
		case FORGOT_PASSWORD_REQUEST:
			return { loading: true };
		case FORGOT_PASSWORD_SUCCESS:
			return { loading: false, forgotten: action.payload };
		case FORGOT_PASSWORD_FAILURE:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
