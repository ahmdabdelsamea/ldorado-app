import React, { useState, useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { investAction } from '../redux/actions/investActions';
import { BackHeader } from '../components/Headers';
import Loading from '../components/Loading';
import InvestSuccess from '../components/InvestSuccess';

const Invest = ({ route, navigation }) => {
	const { id } = route.params;

	const [success, setSuccess] = useState(false);

	const dispatch = useDispatch();

	const propertyDetails = useSelector((state) => state.propertyDetails);
	const { property } = propertyDetails;

	const invest = useSelector((state) => state.invest);
	const { investLoading, investError } = invest;

	const handleInvest = (values) => {
		setSuccess(false);
		dispatch(investAction(id, values));
		setSuccess(true);
	};

	const initialValues = {
		shares: '1',
	};

	const validationSchema = Yup.object().shape({
		shares: Yup.number()
			.positive('Invalid!')
			.integer('Invalid!')
			.min(1)
			.max(property.noSharesLeft)
			.required('Required!'),
	});

	return (
		<View style={styles.container}>
			{investLoading ? (
				<Loading />
			) : success ? (
				<InvestSuccess />
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
						{/* <Text style={styles.text}>Invest</Text> */}
						<View>
							<Formik
								initialValues={initialValues}
								validationSchema={validationSchema}
								onSubmit={handleInvest}
							>
								{({
									handleChange,
									handleBlur,
									handleSubmit,
									values,
									isValid,
									isSubmitting,
								}) => (
									<View style={styles.formContainer}>
										<Text style={styles.investmentNumber}>
											{'$'}
											{Number(values.shares * property.sharePrice).toFixed(2)}
										</Text>
										{/* <Text style={styles.investmentText}>Total Investment</Text> */}
										<Text style={styles.formLabel}>Shares QTY</Text>
										<TextInput
											style={styles.formInput}
											keyboardType='numeric'
											placeholder='Shares QTY'
											onChangeText={handleChange('shares')}
											onBlur={handleBlur('shares')}
											value={values.shares}
										/>

										<TouchableOpacity
											style={styles.submitButton}
											onPress={handleSubmit}
											title='Invest'
											disabled={!isValid}
											// disabled={!isValid || isSubmitting}
										>
											<Text style={styles.submitButtonText}>Invest</Text>
										</TouchableOpacity>
									</View>
								)}
							</Formik>
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
		marginHorizontal: 20,
		marginTop: 100,
	},
	investmentText: {
		fontSize: 16,
		color: '#ccc',
	},
	investmentNumber: {
		fontSize: 60,
		fontWeight: 'bold',
		color: 'white',
	},
	formLabel: {
		marginTop: 20,
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

export default Invest;
