import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';

import { ProgressBar } from './ProgressBar';

export const InvestCard = ({ property, navigation }) => {
	return (
		<TouchableOpacity
			style={styles.cardContainer}
			onPress={() => navigation.navigate('Property', { id: property._id })}
		>
			<Image style={styles.cardImg} source={{ uri: property.files[0].image }} />
			<View style={styles.cardInfo}>
				<View style={styles.cardPrices}>
					<View style={styles.valuationContainer}>
						<Text style={styles.valuationText}>Valuation</Text>
						<Text style={styles.valuationNumber}>
							{'$'}
							{Number(Math.round(property.valuation)).toLocaleString('en')}
						</Text>
					</View>
					<View style={styles.shareContainer}>
						<Text style={styles.shareNumber}>
							{'$'}
							{Number(property.sharePrice.toFixed(2))}
						</Text>

						<Text style={styles.shareText}>Share Price</Text>
					</View>
				</View>
				<View>
					<Text style={styles.textColor}>{property.subType}</Text>
					<Text style={styles.textColor}>
						{property.area} Square Feet | {property.noBeds} beds |{' '}
						{property.noBath} bath
					</Text>
					<Text style={styles.textColor}>
						{property.propertyNumber} {property.street}, {property.city},{' '}
						{property.state} | {property.zip}
					</Text>
				</View>
				<View style={styles.progressBar}>
					<ProgressBar noSharesLeft={property.noSharesLeft} />
				</View>
			</View>
		</TouchableOpacity>
	);
};

export const PortfolioCard = ({ property, navigation }) => {
	return (
		<TouchableOpacity
			style={styles.cardContainer}
			onPress={() => navigation.navigate('Property', { id: property._id })}
		>
			<Image style={styles.cardImg} source={{ uri: property.files[0].image }} />

			<View style={styles.investmentInfo}>
				<View style={styles.totalInvestment}>
					<Text style={styles.infoNumber}>
						{'$'}
						{Number(property.investments[0].totalInvestment).toFixed(2)}
					</Text>
					<Text style={styles.infoText}>Total</Text>
					<Text style={styles.infoText}>Investment</Text>
				</View>
				<View style={styles.ownedShares}>
					<Text style={styles.infoNumber}>
						{Number(property.investments[0].ownedShares).toLocaleString('en')}
					</Text>
					<Text style={styles.infoText}>Owned</Text>
					<Text style={styles.infoText}>Shares</Text>
				</View>
				<View style={styles.estimatedDividends}>
					<Text style={styles.infoNumber}>
						{'$'}
						{Number(
							(property.rentalPrice * property.investments[0].ownedShares) /
								property.totalShares
						).toFixed(3)}
					</Text>
					<Text style={styles.infoText}>Monthly</Text>
					<Text style={styles.infoText}>Dividends*</Text>
				</View>
			</View>

			<View style={styles.cardInfo}>
				<View style={styles.cardPrices}>
					<View style={styles.valuationContainer}>
						<Text style={styles.valuationText}>Valuation</Text>
						<Text style={styles.valuationNumber}>
							{'$'}
							{Number(Math.round(property.valuation)).toLocaleString('en')}
						</Text>
					</View>
					<View style={styles.shareContainer}>
						<Text style={styles.shareNumber}>
							{'$'}
							{Number(property.sharePrice.toFixed(2))}
						</Text>

						<Text style={styles.shareText}>Share Price</Text>
					</View>
				</View>

				<View style={styles.progressBar}>
					<ProgressBar noSharesLeft={property.noSharesLeft} />
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		marginBottom: 20,
		marginHorizontal: 20,
		backgroundColor: '#1C1C1E',
		borderRadius: 15,

		shadowColor: '#000',
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 5,
	},
	cardImg: {
		width: '100%',
		height: 230,
		resizeMode: 'cover',
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
	},
	cardInfo: {
		padding: 15,
	},
	cardPrices: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	valuationText: {
		fontSize: 11,
		color: 'white',
		textTransform: 'uppercase',
	},
	valuationNumber: {
		fontSize: 22,
		fontWeight: 'bold',
		color: 'white',
	},
	shareContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	shareNumber: {
		borderRadius: 8,
		color: 'white',
		paddingHorizontal: 16,
		paddingVertical: 5,
		fontSize: 20,
		fontWeight: 'bold',
		backgroundColor: 'red',
		overflow: 'hidden',
	},
	shareText: {
		color: 'white',
		marginTop: 5,
		fontSize: 11,
		textTransform: 'uppercase',
	},
	textColor: {
		color: 'white',
		fontSize: 16,
		marginTop: 8,
	},
	progressBar: {
		marginTop: 10,
		marginBottom: 5,
	},
	investmentInfo: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		marginTop: 10,
	},
	totalInvestment: {},
	ownedShares: {},
	estimatedDividends: {
		marginVertical: 10,
	},
	infoNumber: {
		color: 'white',
		textAlign: 'center',
		fontSize: 22,
		fontWeight: 'bold',
		marginBottom: 5,
	},
	infoText: {
		color: 'white',
		fontSize: 14,
		textAlign: 'center',
		marginTop: 0,
	},
});
