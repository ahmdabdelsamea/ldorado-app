import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	useWindowDimensions,
} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import { GreenProgressBar } from './ProgressBar';

export default function Tabs({ details }) {
	const FirstRoute = () => (
		<ScrollView style={styles.container}>
			<View style={styles.cardPrices}>
				<View style={styles.valuationContainer}>
					<Text style={styles.valuationText}>Valuation</Text>
					<Text style={styles.valuationNumber}>
						{'$'}
						{Number(Math.round(details.valuation))}
					</Text>
				</View>
				<View style={styles.shareContainer}>
					<Text style={styles.shareNumber}>
						{'$'}
						{Number(details.sharePrice).toFixed(2)}
					</Text>
					<Text style={styles.shareText}>Share Price</Text>
				</View>
			</View>
			<View style={styles.progressContainer}>
				<GreenProgressBar noSharesLeft={details.noSharesLeft} />
			</View>
			<View style={styles.margin}>
				<Text style={styles.textStyle}>LOCATION</Text>
				<Text style={styles.textStyle}>
					{details.propertyNumber} {details.street}, {details.city},{' '}
					{details.state} | {details.zip}
				</Text>
			</View>
			<View style={styles.margin}>
				<Text style={styles.textStyle}>TYPE</Text>
				<Text style={styles.textStyle}>{details.subType}</Text>
			</View>
			<View style={styles.margin}>
				<Text style={styles.textStyle}>OVERVIEW</Text>
				<Text style={styles.textStyle}>{details.overview}</Text>
			</View>
			<View style={styles.margin}>
				<Text style={styles.textStyle}>Listed by</Text>
				<Text style={styles.textStyle}>
					{details.listedBy} | {details.createdBy}
				</Text>
			</View>
		</ScrollView>
	);

	const SecondRoute = () => (
		<ScrollView style={styles.container}>
			<View style={styles.row}>
				<Text style={styles.textStyle}>Area </Text>
				<Text style={styles.textStyle}>{details.area} Square Feet</Text>
			</View>
			<View style={styles.row}>
				<Text style={styles.textStyle}>Bedrooms </Text>
				<Text style={styles.textStyle}>{details.noBeds}</Text>
			</View>
			<View style={styles.row}>
				<Text style={styles.textStyle}>Bathrooms </Text>
				<Text style={styles.textStyle}>{details.noBath} </Text>
			</View>
			<View style={styles.row}>
				<Text style={styles.textStyle}>Flooring </Text>
				<Text style={styles.textStyle}>{details.flooring}</Text>
			</View>
			<View style={styles.row}>
				<Text style={styles.textStyle}>Heating</Text>
				<Text style={styles.textStyle}> {details.heating}</Text>
			</View>
			<View style={styles.row}>
				<Text style={styles.textStyle}>Cooling </Text>
				<Text style={styles.textStyle}>{details.cooling}</Text>
			</View>
			<View style={styles.row}>
				<Text style={styles.textStyle}>Parking </Text>
				<Text style={styles.textStyle}>{details.parking}</Text>
			</View>
			<View style={styles.row}>
				<Text style={styles.textStyle}>Appliances </Text>
				<Text style={styles.textStyle}>{details.appliances}</Text>
			</View>
			<View style={styles.row}>
				<Text style={styles.textStyle}>Laundry </Text>
				<Text style={styles.textStyle}>{details.laundry}</Text>
			</View>
			<View style={styles.row}>
				<Text style={styles.textStyle}>Interior Features </Text>
				<Text style={styles.textStyle}>{details.interiorFeatures}</Text>
			</View>
			<View style={styles.row}>
				<Text style={styles.textStyle}>Exterior features </Text>
				<Text style={styles.textStyle}>{details.exteriorFeatures}</Text>
			</View>
			<View style={styles.row}>
				<Text style={styles.textStyle}>Parcel number </Text>
				<Text style={styles.textStyle}>{details.parcelNumber}</Text>
			</View>
			<View style={styles.row}>
				<Text style={styles.textStyle}>Year Built </Text>
				<Text style={styles.textStyle}>{details.yearBuilt}</Text>
			</View>
			<View style={styles.row}>
				<Text style={styles.textStyle}>Price per Square Feet </Text>
				<Text style={styles.textStyle}>
					{'$'}
					{Number(details.valuation / details.area).toFixed(2)}
				</Text>
			</View>
		</ScrollView>
	);

	const ThirdRoute = () => (
		<ScrollView style={styles.container}>
			<Text style={styles.textStyle}>Monthly Revenues {'&'} Expenses</Text>

			<View style={styles.row}>
				<Text style={styles.textStyle}>Property Taxes*</Text>
				<Text style={styles.textStyle}>{`$${details.taxes}`}</Text>
			</View>
			<View style={styles.row}>
				<Text style={styles.textStyle}>Home Insurance*</Text>
				<Text style={styles.textStyle}>{`$${details.insurance}`}</Text>
			</View>
			<View style={styles.row}>
				<Text style={styles.textStyle}>HOV Fees*</Text>
				<Text style={styles.textStyle}>{`$${details.hov}`}</Text>
			</View>
			<View style={styles.row}>
				<Text style={styles.textStyle}>Utilities Fees*</Text>
				<Text style={styles.textStyle}>{`$${details.utilities}`}</Text>
			</View>
			<View style={styles.row}>
				<Text style={styles.textStyle}>Monthly Expenses*</Text>
				<Text style={styles.textStyle}>{`$${
					details.taxes + details.insurance + details.hov + details.utilities
				}`}</Text>
			</View>
			<View style={styles.row}>
				<Text style={styles.textStyle}>Monthly Rent*</Text>
				<Text style={styles.textStyle}>{`$${details.rentalPrice}`}</Text>
			</View>
			<View style={styles.row}>
				<Text style={styles.textStyle}>Monthly Profit*</Text>
				<Text style={styles.textStyle}>{`$${
					details.rentalPrice -
					details.taxes -
					details.insurance -
					details.hov -
					details.utilities
				}`}</Text>
			</View>
			<Text style={styles.textStyle}>*Estimated</Text>
		</ScrollView>
	);

	const renderScene = SceneMap({
		first: FirstRoute,
		second: SecondRoute,
		third: ThirdRoute,
	});

	const layout = useWindowDimensions();

	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{ key: 'first', title: 'Overview' },
		{ key: 'second', title: 'Details' },
		{ key: 'third', title: 'Income' },
	]);

	return (
		<TabView
			details={details}
			navigationState={{ index, routes }}
			renderScene={renderScene}
			onIndexChange={setIndex}
			initialLayout={{ width: layout.width }}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
		marginHorizontal: 20,
		marginTop: 10,
	},

	cardPrices: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	valuationText: {
		fontSize: 12,
		color: 'white',
		textTransform: 'uppercase',
	},
	valuationNumber: {
		fontSize: 28,
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
		fontSize: 24,
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
	progressContainer: {
		marginVertical: 10,
		marginBottom: 15,
	},
	margin: {
		marginBottom: 15,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 10,
	},
	textStyle: {
		fontSize: 16,
		color: 'white',
	},
});
