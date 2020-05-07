import React, { useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    StatusBar,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

declare const global: { HermesInternal: null | {}; };

const App = () => {

    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hide();
        }, 1000);
    }, []);

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
