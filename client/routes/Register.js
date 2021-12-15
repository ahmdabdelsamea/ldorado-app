import React, { useState } from 'react';
import {
	SafeAreaView,
	View,
	Text,
	Linking,
	TextInput,
	TouchableOpacity,
	ScrollView,
	StatusBar,
	StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { register } from '../redux/actions/userActions';
import Loading from '../components/Loading';

const Register = ({ navigation }) => {
	const [open, setOpen] = useState(false);
	const [date, setDate] = useState(new Date());

	const dispatch = useDispatch();

	const userRegister = useSelector((state) => state.userRegister);
	const { loading, error } = userRegister;

	const registerHandler = (values) => {
		dispatch(register(values));
	};

	const genders = [
		{ key: 'Male', value: 'male' },
		{ key: 'Female', value: 'female' },
	];

	const initialValues = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		passwordConfirmation: '',
		gender: '',
		birthday: new Date(),
	};

	// const PHONE_REGEX =
	// 	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

	const PASSWORD_REGEX = /^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u;
	// const PASSWORD_REGEX =
	// 	/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

	const validationSchema = Yup.object().shape({
		firstName: Yup.string()
			.min(3, 'Too Short!')
			.max(50, 'Too Long!')
			.required('Required!'),
		lastName: Yup.string()
			.min(3, 'Too Short!')
			.max(50, 'Too Long!')
			.required('Required!'),
		// phoneNumber: Yup.string()
		// 	.matches(PHONE_REGEX, 'Phone number is not valid')
		// 	.required('Required!'),
		email: Yup.string().email('Invalid Email!').required('Required!'),
		password: Yup.string()
			.min(8, 'must be at least 8 characters')
			.max(72, 'cannot be maximum 72 characters')
			.matches(
				PASSWORD_REGEX,
				'Password must contain one uppercase letter, one lowercase letter and one digit!'
			)
			.required('Required!'),
		passwordConfirmation: Yup.string().when('password', {
			is: (val) => (val && val.length > 0 ? true : false),
			then: Yup.string().oneOf(
				[Yup.ref('password')],
				'Password does not match'
			),
		}),
		gender: Yup.string().required('Required!'),
		birthday: Yup.date().required('Required!').nullable(),
	});

	return (
		<View style={styles.container}>
			{loading ? (
				<Loading />
			) : (
				<SafeAreaView style={styles.container}>
					<StatusBar hidden />
					<LinearGradient
						colors={[
							'rgba(200,111,247,1)',
							'rgba(10,10,71,1)',
							'rgba(0,0,1,1)',
							'transparent',
						]}
						style={styles.background}
					/>
					<View style={styles.row}>
						<TouchableOpacity
							style={styles.titleLinkButton}
							onPress={() => navigation.goBack()}
							title='Login'
						>
							<Text style={styles.titleLink}>Login</Text>
						</TouchableOpacity>
						<Text style={styles.title}> | Register</Text>
					</View>
					<ScrollView>
						<Formik
							initialValues={initialValues}
							validationSchema={validationSchema}
							onSubmit={registerHandler}
						>
							{({
								handleChange,
								handleBlur,
								handleSubmit,
								values,
								isValid,
								isSubmitting,
								setFieldValue,
							}) => (
								<View style={styles.formContainer}>
									<View style={styles.formRow}>
										<View style={styles.halfRow}>
											<Text style={styles.formLabel}>First Name</Text>
											<TextInput
												style={styles.formInput}
												secureTextEntry={false}
												onChangeText={handleChange('firstName')}
												onBlur={handleBlur('firstName')}
												value={values.firstName}
											/>
										</View>
										<View style={styles.halfRow}>
											<Text style={styles.formLabel}>Last Name</Text>
											<TextInput
												style={styles.formInput}
												secureTextEntry={false}
												onChangeText={handleChange('lastName')}
												onBlur={handleBlur('lastName')}
												value={values.lastName}
											/>
										</View>
									</View>

									<View>
										<Text style={styles.formLabel}>Email</Text>
										<TextInput
											style={styles.formInput}
											secureTextEntry={false}
											onChangeText={handleChange('email')}
											onBlur={handleBlur('email')}
											value={values.email}
										/>
									</View>

									<View>
										<Text style={styles.formLabel}>Password</Text>
										<TextInput
											style={styles.formInput}
											secureTextEntry={true}
											onChangeText={handleChange('password')}
											onBlur={handleBlur('password')}
											value={values.password}
										/>
									</View>

									<View>
										<Text style={styles.formLabel}>Confirm Password</Text>
										<TextInput
											style={styles.formInput}
											secureTextEntry={true}
											onChangeText={handleChange('passwordConfirmation')}
											onBlur={handleBlur('passwordConfirmation')}
											value={values.passwordConfirmation}
										/>
									</View>
									<View style={styles.formRow}>
										<View style={styles.halfRow}>
											<Text style={styles.formLabel}>Gender</Text>

											<RNPickerSelect
												style={pickerSelectStyles}
												placeholder={{}}
												useNativeAndroidPickerStyle={false}
												items={[
													{ label: 'Male', value: 'Male' },
													{ label: 'Female', value: 'Female' },
												]}
												onValueChange={(value) =>
													setFieldValue('gender', value)
												}
												value={values.gender}
											/>
										</View>
										<View style={styles.halfRow}>
											<Text style={styles.formLabel}>Birthday</Text>
											<DateTimePicker
												style={styles.datePicker}
												testID='dateTimePicker'
												value={values.birthday}
												mode='date'
												themeVariant='dark'
												display='default'
												onChange={(event, date) =>
													setFieldValue('birthday', date)
												}
											/>
										</View>
									</View>

									<TouchableOpacity
										style={styles.submitButton}
										onPress={handleSubmit}
										title='Register'
										// disabled={!isValid}
										disabled={!isValid || isSubmitting}
									>
										<Text style={styles.submitButtonText}>Register</Text>
									</TouchableOpacity>
									<View style={styles.textRow}>
										<Text style={{ color: 'white' }}>
											By clicking this button, you agree to l.dorado's
										</Text>
										<Text
											style={{ color: '#FFDE03' }}
											onPress={() => Linking.openURL('http://google.com')}
										>
											Terms and Privacy Policy
										</Text>
									</View>
								</View>
							)}
						</Formik>
					</ScrollView>
					<Text style={styles.ldorado}>l.dorado</Text>
				</SafeAreaView>
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
	formRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	row: {
		flexDirection: 'row',
		marginHorizontal: 20,
		marginTop: 40,
		alignItems: 'center',
	},
	halfRow: {
		width: '48%',
	},
	title: {
		color: 'white',
		fontSize: 28,
		fontWeight: 'bold',
		textTransform: 'uppercase',
	},
	titleLink: {
		color: '#FFDE03',
		fontSize: 28,
		fontWeight: 'bold',
		textTransform: 'uppercase',
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
		height: 45,
		padding: 12,
		fontSize: 16,
		color: 'white',
		borderRadius: 10,
		marginBottom: 10,
		borderWidth: 0.5,
		borderColor: '#FFDE03',
	},
	genderPicker: {
		marginTop: 0,
		color: 'white',
	},
	datePicker: {
		flex: 1,
		marginRight: 50,
		borderRadius: 10,
		// borderWidth: 0.5,
		// borderColor: '#FFDE03',
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
	textRow: {
		marginTop: 5,
		alignItems: 'center',
	},
	ldorado: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 28,
		color: '#FFDE03',
	},
});

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		fontSize: 14,
		paddingVertical: 10,
		paddingHorizontal: 12,
		borderWidth: 0.5,
		borderColor: '#FFDE03',
		borderRadius: 8,
		color: 'white',
		paddingRight: 30, // to ensure the text is never behind the icon
	},
	inputAndroid: {
		fontSize: 14,
		paddingHorizontal: 10,
		paddingVertical: 8,
		borderWidth: 0.5,
		borderColor: 'blue',
		borderRadius: 8,
		color: 'black',
		paddingRight: 30, // to ensure the text is never behind the icon
	},
});

export default Register;
