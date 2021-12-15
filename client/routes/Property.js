import React, { useEffect } from 'react';
import {
	StyleSheet,
	StatusBar,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { listPropertyDetails } from '../redux/actions/propertyActions';
import { BackHeader } from '../components/Headers';
import CustomSlider from '../components/Carousel';
import Tabs from '../components/Tabs';
import Loading from '../components/Loading';

const Property = ({ route, navigation }) => {
	const { id } = route.params;

	const dispatch = useDispatch();

	const propertyDetails = useSelector((state) => state.propertyDetails);
	const { loading, error, property } = propertyDetails;

	useEffect(() => {
		dispatch(listPropertyDetails(id));
	}, [dispatch, navigation]);

	const loadingImg = [
		{ image: 'https://source.unsplash.com/jf1EomjlQi0/1600x1100' },
	];

	return (
		<View style={styles.container}>
			{loading ? (
				<Loading />
			) : (
				<View style={styles.container}>
					<StatusBar hidden />
					<BackHeader navigation={navigation} />
					<CustomSlider data={property.files ? property.files : loadingImg} />
					<Tabs details={property} />
					<TouchableOpacity
						style={styles.investButton}
						onPress={() => navigation.navigate('Invest', { id: property._id })}
						title='Invest'
					>
						<Text style={styles.investButtonText}>Invest</Text>
					</TouchableOpacity>
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
	investButton: {
		backgroundColor: '#FFDE03',
		padding: 20,
	},
	investButtonText: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#000',
		textAlign: 'center',
	},
});

export default Property;
