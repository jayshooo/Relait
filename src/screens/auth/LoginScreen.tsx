import React, { useEffect } from 'react';
import {
    Text,
    SafeAreaView,
    Image,
    Dimensions,
    View,
    TextStyle,
} from 'react-native';
import KakaoLogins from '@react-native-seoul/kakao-login';
import { TextSize, TextWeight, Color } from '../../constants/styles';
import CommonButton from '../../components/CommonButton';


const { width } = Dimensions.get('window');

const LoginScreen = () => {

    // useEffect(() => {
    //     KakaoLogins.login().then(result => {
    //         console.log(result);
    //     });
    // }, []);

    return (
        <SafeAreaView
            style={ {
                flex: 1,
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
            <CommonButton
                icon={ require('../../resources/icons/Kakaotalk.png') }
                buttonTitle={ '카카오계정으로 시작하기' }
                onPressCallback={ () => {
                    console.log('====================================');
                    console.log('카카오 로그인 하기');
                    console.log('====================================');
                } }
                buttonColor={ Color.kakaoYellow }
                textColor={ Color.kakaoBrown }
                hasShadow={ false } />
        </SafeAreaView>
    );
};

export default LoginScreen;