import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const FundsSuccess = ({ funds }) => {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<LinearGradient
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
				style={styles.background}
			/>
			<Text style={styles.funds}>
				{'$'}
				{funds}
			</Text>
			<Text style={styles.message}>Successfully added to wallet</Text>

			<TouchableOpacity
				style={styles.submitButton}
				onPress={() =>
					navigation.reset({
						index: 0,
						routes: [{ name: 'Home' }],
					})
				}
			>
				<Text style={styles.submitButtonText}>Go Home</Text>
			</TouchableOpacity>
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
	funds: {
		marginTop: 150,
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 60,
		color: '#fff',
	},
	message: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 24,
		color: '#fff',
	},
	submitButton: {
		margin: 20,
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

export default FundsSuccess;
