import React from "react";

import LoginScreen from "../screens/auth/LoginScreen";
import SplashScreen from "../screens/SplashScreen";
import MainScreen from "../screens/MainScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PlaceRegistScreen } from "../screens/place/PlaceRegistScreen";
import { PlaceDetailScreen } from "../screens/place/PlaceDetailScreen";
import { ISeat } from "../store/reducers/seats/types";

const Stack = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
    SplashScreen: undefined;
    LoginScreen: undefined;
    MainScreen: undefined;
    PlaceRegistScreen: {
        selectedSeat: ISeat;
    };
    PlaceDetailScreen: undefined;
};

const AppNavigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="SplashScreen"
				screenOptions={ {
					headerShown: false,
				} }>
				<Stack.Screen
					name="SplashScreen"
					component={ SplashScreen } />
				<Stack.Screen
					name="LoginScreen"
					component={ LoginScreen } />
				<Stack.Screen
					name="MainScreen"
					component={ MainScreen } />
				<Stack.Screen
					name="PlaceRegistScreen"
					component={ PlaceRegistScreen } />
				<Stack.Screen
					name="PlaceDetailScreen"
					component={ PlaceDetailScreen } />
			</Stack.Navigator>
		</NavigationContainer>
	);
};


export default AppNavigation;
