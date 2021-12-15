import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export const HomeHeader = () => {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<TouchableOpacity>
				<Text style={styles.logo}>l.dorado</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
				{/* <View style={styles.unreadBadge}>
					<Text style={styles.unreadBadgeText}>1</Text>
				</View> */}
				<Ionicons name='person-circle-outline' size={32} color='white' />
			</TouchableOpacity>
		</View>
	);
};

export const BackHeader = () => {
	const navigation = useNavigation();

	return (
		<View style={styles.backContainer}>
			<TouchableOpacity
				style={styles.dashboardHeader}
				onPress={() => navigation.goBack()}
			>
				<Ionicons name='close-circle' size={36} color='rgba(255,255,255,0.5)' />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginHorizontal: 25,
		backgroundColor: '#000',
		paddingVertical: 15,
		marginTop: 15,
	},
	logo: {
		color: 'white',
		fontSize: 24,
		fontWeight: 'bold',
	},
	unreadBadge: {
		position: 'absolute',
		left: 20,
		bottom: 18,
		width: 20,
		height: 20,
		borderRadius: 50,
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 100,
		backgroundColor: 'red',
	},
	unreadBadgeText: {
		color: 'white',
		fontWeight: 'bold',
	},
	backContainer: {
		position: 'absolute',
		left: 15,
		top: 15,
		zIndex: 100,
	},
});
