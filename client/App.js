import React, { useState, useEffect } from 'react';
import { StripeProvider } from '@stripe/stripe-react-native';
import { Provider } from 'react-redux';

import store from './redux/store';
import MainNavigation from './routes/';
import { getPublishableKey } from './utils/getPublishableKey';

export default function App() {
	const [publishableKey, setPublishableKey] = useState('');

	useEffect(() => {
		const fetchPublishableKey = async () => {
			const { publishableKey } = await getPublishableKey();
			setPublishableKey(publishableKey);
		};

		fetchPublishableKey();
	}, []);

	return (
		<Provider store={store}>
			<StripeProvider publishableKey={publishableKey}>
				<MainNavigation />
			</StripeProvider>
		</Provider>
	);
}
