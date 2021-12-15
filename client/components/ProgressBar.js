import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ProgressBar = ({ noSharesLeft }) => {
	let totalShares = 1000000;
	let percentage = (noSharesLeft / totalShares) * 100;

	return (
		<View style={styles.progress}>
			<View style={[styles.progressFill, { width: `${percentage}%` }]}></View>
			<Text style={styles.progressText}>{noSharesLeft} Shares Left</Text>
		</View>
	);
};

export const GreenProgressBar = ({ noSharesLeft }) => {
	let totalShares = 1000000;
	let percentage = (noSharesLeft / totalShares) * 100;

	return (
		<View style={styles.progress}>
			<View
				style={[styles.greenProgressFill, { width: `${percentage}%` }]}
			></View>
			<Text style={styles.progressText}>{noSharesLeft} Shares Left</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	progress: {
		width: '100%',
		height: 40,
		backgroundColor: '#CCC',
		borderRadius: 10,
		overflow: 'hidden',
		position: 'relative',
	},
	progressFill: {
		height: '100%',
		backgroundColor: '#FFDE03',
		borderRadius: 10,
	},
	greenProgressFill: {
		height: '100%',
		backgroundColor: '#00FF00',
		borderRadius: 10,
	},
	progressText: {
		position: 'absolute',
		left: 10,
		top: 10,
		fontSize: 16,
		fontWeight: 'bold',
		color: 'black',
	},
});
