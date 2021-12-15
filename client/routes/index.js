import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
// import * as SecureStore from 'expo-secure-store';

import Home from './Home';
import Property from './Property';
import Invest from './Invest';
import Dashboard from './Dashboard';
import AddFunds from './AddFunds';
import Login from './Login';
import Register from './Register';

const screenOptions = {
	headerShown: false,
};

const Stack = createStackNavigator();

const MainNavigation = () => {
	const userLogin = useSelector((state) => state.userLogin);
	const { authToken } = userLogin;

	return (
		<>
			{authToken !== null ? (
				<NavigationContainer>
					<Stack.Navigator
						initialRouteName='Home'
						screenOptions={screenOptions}
					>
						<Stack.Screen name='Home' component={Home} />
						<Stack.Screen name='Property' component={Property} />
						<Stack.Screen name='Invest' component={Invest} />
						<Stack.Screen name='Dashboard' component={Dashboard} />
						<Stack.Screen name='AddFunds' component={AddFunds} />
					</Stack.Navigator>
				</NavigationContainer>
			) : (
				<NavigationContainer>
					<Stack.Navigator
						initialRouteName='Login'
						screenOptions={screenOptions}
					>
						<Stack.Screen name='Login' component={Login} />
						<Stack.Screen name='Register' component={Register} />
					</Stack.Navigator>
				</NavigationContainer>
			)}
		</>
	);
};

export default MainNavigation;
