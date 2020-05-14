import React from 'react';

import LoginScreen from '../screens/auth/LoginScreen';
import SplashScreen from '../screens/SplashScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
    SplashScreen: undefined;
    LoginScreen: undefined;
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
            </Stack.Navigator>
        </NavigationContainer>
    );
};


export default AppNavigation;
