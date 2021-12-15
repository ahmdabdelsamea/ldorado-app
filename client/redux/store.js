import * as SecureStore from 'expo-secure-store';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { addFundsReducer } from './reducers/addFundsReducers';
import { dashboardDetailsReducer } from './reducers/dashboardReducers';
import { investReducer } from './reducers/investReducers';
import {
	propertyListReducer,
	propertyDetailsReducer,
} from './reducers/propertyReducers';
import {
	userRegisterReducer,
	userLoginReducer,
	forgotPasswordReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
	userRegister: userRegisterReducer,
	userLogin: userLoginReducer,
	forgotPassword: forgotPasswordReducer,
	propertyList: propertyListReducer,
	propertyDetails: propertyDetailsReducer,
	invest: investReducer,
	addFunds: addFundsReducer,
	dashboardDetails: dashboardDetailsReducer,
});

// const authTokenFromStorage = async () => {
// 	return await SecureStore.getItemAsync('authToken');
// };

const initialState = {};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
