import React, { useEffect } from 'react';
import { View, Alert, StatusBar, Appearance } from 'react-native';
import AppNavigation from './src/navigation/Navigation';
import { useSelector } from 'react-redux';
import { RootState } from './src/store/reducers';

declare const global: { HermesInternal: null | {}; };

const App = () => {

    const alertObj = useSelector((state: RootState) => state.ui.alertObj);

    useEffect(() => {

        if (alertObj.visible) {
            Alert.alert(alertObj.title, alertObj.content, alertObj.buttons, {
                cancelable: alertObj.cancelable,
            });
        }

    }, [ alertObj.visible ]);

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
