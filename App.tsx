import React, { useEffect } from 'react';
import { View, Alert, StatusBar, Appearance } from 'react-native';
import AppNavigation from './src/navigation/Navigation';
import { useSelector } from 'react-redux';
import { RootState } from './src/store/reducers';
import AsyncStorage from '@react-native-community/async-storage';
import { ASYNC_STORAGE_API_TOKEN } from './src/constants/constants';

declare const global: { HermesInternal: null | {}; };

const App = () => {

    const alertObj = useSelector((state: RootState) => state.ui.alertObj);
    const token = useSelector((state: RootState) => state.myInfo.token);

    useEffect(() => {

        if (alertObj.visible) {
            Alert.alert(alertObj.title, alertObj.content, alertObj.buttons, {
                cancelable: alertObj.cancelable,
            });
        }

    }, [ alertObj.visible ]);

    const setTokenToLocalStorage = async (token: string) => {
        try {
            await AsyncStorage.setItem(ASYNC_STORAGE_API_TOKEN, token);
        }
        catch (e) {
            throw new Error(e);
        }
    };

    useEffect(() => {

        if (!token) return;
        setTokenToLocalStorage(token);

    }, [ token ]);

    const isDarkMode = Appearance.getColorScheme() === 'dark';

    return (
        <View
            style={ { flex: 1 } }>
            <StatusBar
                barStyle={ isDarkMode ? 'light-content' : 'dark-content' } />
            <AppNavigation />
        </View>
    );

};

export default App;
