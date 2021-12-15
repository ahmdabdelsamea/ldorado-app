import axios from 'axios';
import { Alert } from 'react-native';

import { API_URL } from './config';

export const getPublishableKey = async () => {
	try {
		const { data } = await axios.get(`${API_URL}` + '/getPublishableKey');
		return data;
	} catch (error) {
		console.log(error);
		Alert.alert('Error', 'Unable to get publishable key!');
	}
};
