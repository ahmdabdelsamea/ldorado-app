import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Loading = () => {
	return (
		<View style={styles.container}>
			<StatusBar hidden />
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
			<Text style={styles.loading}>Loading...</Text>
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
	loading: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		marginBottom: 80,
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 28,
		color: '#FFDE03',
	},
});

export default Loading;
