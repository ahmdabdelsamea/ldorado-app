import React, { useEffect } from 'react';
import {
	StatusBar,
	View,
	ScrollView,
	FlatList,
	StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { listProperty } from '../redux/actions/propertyActions';
import { InvestCard } from '../components/Cards';
import { HomeHeader } from '../components/Headers';
import Loading from '../components/Loading';

const Home = ({ navigation }) => {
	const dispatch = useDispatch();

	const propertyList = useSelector((state) => state.propertyList);
	const { loading, error, properties } = propertyList;

	useEffect(() => {
		dispatch(listProperty());
	}, [dispatch, navigation]);

	return (
		<View style={styles.container}>
			{loading ? (
				<Loading />
			) : (
				<View style={styles.container}>
					<StatusBar hidden />
					<HomeHeader navigation={navigation} />
					<FlatList
						data={properties}
						keyExtractor={(item) => item._id}
						renderItem={({ item }) => (
							<View>
								<InvestCard navigation={navigation} property={item} />
							</View>
						)}
					/>

					{/* <ScrollView style={styles.scrollViewContainer}>
						{properties.map((propertyCard) => (
							<View key={propertyCard._id}>
								<InvestCard navigation={navigation} property={propertyCard} />
							</View>
						))}
					</ScrollView> */}
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
	listContainer: {
		flex: 1,
	},
	textColor: {
		color: 'white',
		fontSize: 20,
	},
	scrollViewContainer: {
		flex: 1,
	},
});

export default Home;
