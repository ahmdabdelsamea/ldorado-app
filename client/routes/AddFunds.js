import React, { useState } from 'react';
import axios from 'axios';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	ScrollView,
	TouchableOpacity,
	Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import * as SecureStore from 'expo-secure-store';

import { BackHeader } from '../components/Headers';
import Loading from '../components/Loading';
import FundsSuccess from '../components/FundsSuccess';
import { API_URL } from '../utils/config';

const AddFunds = ({ navigation }) => {
	const [loading, setLoading] = useState(false);
	const [balance, setBalance] = useState('1');
	const [funds, setFunds] = useState(null);
	const [success, setSuccess] = useState(false);

	const { confirmPayment } = useStripe();

	const addFundsHandler = async () => {
		setSuccess(false);
		setLoading(true);

		const authToken = await SecureStore.getItemAsync('authToken');

		// prettier-ignore
		const config = {
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${authToken}`,
			},
		};

		const { data } = await axios.post(
			`${API_URL}` + `/create-payment-intent`,
			{ dollars: balance },
			config
		);

		const { error, paymentIntent } = await confirmPayment(data.client_secret, {
			type: 'Card',
		});

		if (error) {
			Alert.alert(`Error: ${error.code}`, error.message);
		} else if (paymentIntent) {
			const amount = paymentIntent.amount / 100;
			setFunds(amount);
		}

		setLoading(false);
		setSuccess(true);
	};

	return (
		<View style={styles.container}>
			{loading ? (
				<Loading />
			) : success ? (
				<FundsSuccess funds={funds} />
			) : (
				<View style={styles.container}>
					<BackHeader navigation={navigation} />
					<LinearGradient
						style={styles.background}
						colors={[
							'#D26DF8',
							'#B03DE2',
							'#4417A4',
							'#160C6F',
							'#08074C',
							'#040430',
							'#020219',
							'#010108',
							'#000002',
							'transparent',
						]}
					/>
					<ScrollView>
						<Text style={styles.text}>Add Funds</Text>
						<View style={styles.formContainer}>
							<TextInput
								style={styles.formInput}
								keyboardType='numeric'
								placeholder='Balance'
								onChangeText={(balance) => setBalance(balance)}
								defaultValue={balance}
							/>
							<CardField
								postalCodeEnabled={false}
								style={styles.formInput}
								cardStyle={{
									backgroundColor: '#00000050',
									textColor: '#FFDE03',
									fontSize: 20,
								}}
							/>
							<TouchableOpacity
								style={styles.submitButton}
								onPress={addFundsHandler}
								title='Add Funds'
								// disabled={loading}
							>
								<Text style={styles.submitButtonText}>Add Funds</Text>
							</TouchableOpacity>
						</View>
					</ScrollView>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'black',
		flex: 1,
	},
	background: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: '100%',
	},
	text: {
		fontSize: 30,
		fontWeight: 'bold',
		color: 'white',
		textTransform: 'uppercase',
		marginHorizontal: 20,
		marginTop: 60,
	},
	formContainer: {
		margin: 20,
	},
	formLabel: {
		color: '#ccc',
		marginLeft: 5,
		marginBottom: 5,
		fontSize: 16,
	},
	formInput: {
		backgroundColor: 'rgba(0,0,0,0.5)',
		height: 50,
		padding: 12,
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		color: 'white',
		borderRadius: 10,
		marginBottom: 10,
		borderWidth: 0.5,
		borderColor: '#FFDE03',
	},
	submitButton: {
		marginTop: 20,
		backgroundColor: '#FFDE03',
		borderRadius: 10,
		padding: 10,
	},
	submitButtonText: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#000',
		textAlign: 'center',
	},
});

export default AddFunds;
