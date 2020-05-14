import React from 'react';
import {
    Text,
    SafeAreaView,
} from 'react-native';

const LoginScreen = () => {
    return (
        <SafeAreaView
            style={ {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            } }>
            <Text>나는야 로그인 스크린</Text>
        </SafeAreaView>
    );
};

export default LoginScreen;