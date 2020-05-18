import React from 'react';
import {
    Text,
    SafeAreaView,
    Image,
    Dimensions,
    View,
    TextStyle,
} from 'react-native';
import { TextSize, TextWeight } from '../../constants/styles';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
    return (
        <SafeAreaView
            style={ {
                flex: 1,
                borderWidth: 1,
            } }>
            <View
                style={ {
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    left: 0,
                } }>
                <Image
                    style={ {
                        width,
                    } }
                    resizeMode={ 'stretch' }
                    source={ require('../../resources/images/LoginScreenImage.png') }></Image>
            </View>
            <View
                style={ {
                    flex: 1,
                    alignSelf: 'stretch',
                    paddingHorizontal: 26,
                    paddingTop: 120,
                } }>
                <Text
                    style={ {
                        fontSize: TextSize.h1,
                    } }>오늘은 또</Text>
                <Text
                    style={ {
                        fontSize: TextSize.h1,
                        fontWeight: TextWeight.bold
                    } as TextStyle }>어디서 작업할지{ '\n' }막막해?</Text>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;