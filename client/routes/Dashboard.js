import React, { useEffect } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	FlatList,
	StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';

import { getDashboard } from '../redux/actions/dashboardActions';
import { BackHeader } from '../components/Headers';
import { PortfolioCard } from '../components/Cards';
import Loading from '../components/Loading';
import Failure from '../components/Failure';

const Dashboard = ({ navigation }) => {
	const dispatch = useDispatch();

	const dashboardDetails = useSelector((state) => state.dashboardDetails);
	const { loading, error, dashboard } = dashboardDetails;

	useEffect(() => {
		dispatch(getDashboard());
	}, [dispatch, navigation]);

	return (
		<View style={styles.container}>
			{loading ? (
				<Loading />
			) : error ? (
				<Failure failure={error} />
			) : (
				<View style={styles.container}>
					<BackHeader navigation={navigation} />
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

					<View style={styles.walletContainer}>
						<Text style={styles.yourWallet}>Your Wallet</Text>
						<Text style={styles.walletName}>
							{dashboard.firstName} {dashboard.lastName}
						</Text>

						<Text style={styles.walletBalance}>
							USD {Number(dashboard.wallet).toFixed(2)}
						</Text>

						<TouchableOpacity
							style={styles.fundsButton}
							onPress={() => navigation.navigate('AddFunds')}
							title='Add Funds'
						>
							<Text style={styles.fundsButtonText}>+ Add Funds</Text>
						</TouchableOpacity>
					</View>
					<FlatList
						data={dashboard.investedInProperties}
						keyExtractor={(item) => item._id}
						renderItem={({ item }) => (
							<View>
								<PortfolioCard navigation={navigation} property={item} />
							</View>
						)}
					/>
					{/* <ScrollView style={styles.scrollViewContainer}>
						{dashboard.investedInProperties.map((propertyCard) => (
							<View key={propertyCard._id}>
								<PortfolioCard
									navigation={navigation}
									property={propertyCard}
								/>
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
	background: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: '100%',
	},
	walletContainer: {
		padding: 30,
		margin: 15,
		marginTop: 60,
		borderRadius: 20,
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
	},
	yourWallet: {
		fontSize: 12,
		color: 'white',
		textTransform: 'uppercase',
	},
	walletName: {
		fontSize: 20,
		fontWeight: 'bold',
		textTransform: 'uppercase',
		color: 'white',
	},
	walletBalance: {
		marginVertical: 20,
		fontSize: 35,
		fontWeight: 'bold',
		textTransform: 'uppercase',
		color: 'white',
	},
	fundsButton: {
		padding: 10,
		width: 150,
		backgroundColor: '#FFDE03',
		borderRadius: 50,
	},
	fundsButtonText: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	scrollViewContainer: {
		flex: 1,
	},
});

export default Dashboard;
