import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    StatusBar,
} from 'react-native';
// import { useSelector } from 'react-redux';
// import { RootState } from './src/store/reducers';
import NetInfo from "@react-native-community/netinfo";
import SplashScreen from 'react-native-splash-screen';

declare const global: { HermesInternal: null | {}; };

const App = () => {

    const [ isConnected, setIsConnected ] = useState(false);

    NetInfo.fetch().then(state => {
        setIsConnected(state.isConnected);
    });

    useEffect(() => {

        if (isConnected) {
            SplashScreen.hide();
        }

    }, [ isConnected ]);

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView
                style={ styles.view }>
                <Text
                    style={ {
                        fontSize: 28,
                    } }>Relait</Text>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default App;
