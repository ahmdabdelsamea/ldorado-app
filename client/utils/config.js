import { Platform } from 'react-native';

export const API_URL =
	Platform.OS === 'android'
		? 'http://10.0.2.2:8080'
		: 'http://192.168.1.8:8080';
