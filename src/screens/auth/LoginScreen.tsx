import React, { useEffect, useState } from 'react';
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
import { OverlayViewInterface } from './types/LoginScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';


const { width } = Dimensions.get('window');

const OverlayView: React.FC<OverlayViewInterface> = ({ onPressCloseButton }) => {

    const [ buttonHeight, setButtonHeight ] = useState(0);

    return (
        <View
            style={ {
                flex: 1,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
            } }>
            <View
                style={ {
                    flex: 1,
                } }>
                <CommonButton
                    icon={ require('../../resources/icons/Kakaotalk.png') }
                    buttonTitle={ '카카오톡으로 간편 로그인' }
                    onPressCallback={ () => {
                        console.log('====================================');
                        console.log('카카오톡으로 간편 로그인');
                        console.log('====================================');
                    } }
                    buttonColor={ Color.kakaoYellow }
                    textColor={ Color.kakaoBrown }
                    hasShadow={ false }
                    onLayout={ layout => {
                        if (!layout) return;
                        const { height } = layout;
                        setButtonHeight(height);
                    } }
                    additioinalStyle={ {
                        marginBottom: buttonHeight + 12,
                    } } />
                <CommonButton
                    icon={ require('../../resources/icons/KakaoAnother.png') }
                    buttonTitle={ '다른 카카오계정으로 로그인' }
                    onPressCallback={ () => {
                        console.log('====================================');
                        console.log('다른 카카오계정으로 로그인');
                        console.log('====================================');
                    } }
                    buttonColor={ Color.kakaoYellow }
                    textColor={ Color.kakaoBrown }
                    hasShadow={ false } />
            </View>
            <TouchableOpacity
                style={ {
                    marginBottom: 40,
                    alignItems: 'center',
                } }
                onPress={ onPressCloseButton }>
                <Image source={ require('../../resources/icons/CloseWhite.png') } />
            </TouchableOpacity>
        </View>
    );

};

const LoginScreen: React.FC = () => {

    const [ showOverlayView, setShowOverlayView ] = useState(false);
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
            { !showOverlayView && (
                <CommonButton
                    icon={ require('../../resources/icons/Kakaotalk.png') }
                    buttonTitle={ '카카오계정으로 시작하기' }
                    onPressCallback={ () => {
                        setShowOverlayView(true);
                    } }
                    buttonColor={ Color.kakaoYellow }
                    textColor={ Color.kakaoBrown }
                    hasShadow={ false } />
            ) }
            { showOverlayView && (
                <OverlayView
                    onPressCloseButton={ () => {
                        setShowOverlayView(false);
                    } } />
            ) }
        </SafeAreaView>
    );
};

export default LoginScreen;