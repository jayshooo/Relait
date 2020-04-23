import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    StatusBar,
} from 'react-native';

declare const global: { HermesInternal: null | {}; };

const App = () => {
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
