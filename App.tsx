import React, { useEffect } from 'react';
import { View, Alert } from 'react-native';
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

    return (
        <View
            style={ { flex: 1 } }>
            <AppNavigation />
        </View>
    );

};

export default App;
