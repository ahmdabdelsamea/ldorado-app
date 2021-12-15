import React from 'react';
import {
	SafeAreaView,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ScrollView,
	StatusBar,
	StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { login } from '../redux/actions/userActions';
import Loading from '../components/Loading';

const Login = ({ navigation }) => {
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, authToken } = userLogin;

	const loginHandler = (values) => {
		dispatch(login(values));
	};

	const initialValues = {
		email: '',
		password: '',
	};

	const validationSchema = Yup.object().shape({
		email: Yup.string().email('Invalid Email!').required('Required!'),
		password: Yup.string().required('Required!'),
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
						<Text style={styles.title}>Login</Text>
						<TouchableOpacity
							style={styles.titleLinkButton}
							onPress={() => navigation.navigate('Register')}
							title='Register'
						>
							<Text style={styles.titleLink}> | Register</Text>
						</TouchableOpacity>
					</View>
					<ScrollView>
						<Formik
							initialValues={initialValues}
							validationSchema={validationSchema}
							onSubmit={loginHandler}
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
									<Text style={styles.formLabel}>Email</Text>
									<TextInput
										style={styles.formInput}
										secureTextEntry={false}
										onChangeText={handleChange('email')}
										onBlur={handleBlur('email')}
										value={values.email}
									/>
									<Text style={styles.formLabel}>Password</Text>
									<TextInput
										style={styles.formInput}
										secureTextEntry={true}
										onChangeText={handleChange('password')}
										onBlur={handleBlur('password')}
										value={values.password}
									/>
									<TouchableOpacity
										style={styles.submitButton}
										onPress={handleSubmit}
										title='Login'
										// disabled={!isValid}
										disabled={!isValid || isSubmitting}
									>
										<Text style={styles.submitButtonText}>Login</Text>
									</TouchableOpacity>
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
	row: {
		flexDirection: 'row',
		marginHorizontal: 20,
		marginTop: 40,
		alignItems: 'center',
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
	ldorado: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 28,
		color: '#FFDE03',
	},
});

export default Login;
