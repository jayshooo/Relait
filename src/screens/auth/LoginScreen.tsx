import React, { useCallback } from 'react';
import {
    Text,
    SafeAreaView,
    Image,
    Dimensions,
    View,
    TextStyle,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import KakaoLogins from '@react-native-seoul/kakao-login';
import { TextSize, TextWeight, Color } from '../../constants/styles';
import { ASYNC_STORAGE_LOGIN_KEY } from '../../constants/constants';
import CommonButton from '../../components/CommonButton';
import { useNavigation, StackActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setMyInfo } from '../../store/actions/myinfo/action';
import { RootState } from '../../store/reducers';
import { LOGIN_REQUEST } from '../../store/saga/types';

const { width, height } = Dimensions.get('window');

const LoginScreen: React.FC = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const myInfo = useSelector((state: RootState) => state.myInfo);

    console.log('====================================');
    console.log(myInfo);
    console.log('====================================');

    const Login = useCallback(async () => {
        try {
            const LoginResult = await KakaoLogins.login();
            // TODO. 카카오 로그인 성공 후 토큰으로 개인정보 불러온 후 백엔드 로그인 API 요청해야함
            await AsyncStorage.setItem(ASYNC_STORAGE_LOGIN_KEY, JSON.stringify(LoginResult));
            const getProfileResult = await KakaoLogins.getProfile();
            dispatch(setMyInfo(getProfileResult));
            dispatch({
                type: LOGIN_REQUEST,
                data: getProfileResult.id,
            });
            navigation.dispatch(StackActions.replace('MainScreen'));
        }
        catch (e) {
            throw new Error(e);
        }
    }, []);

    return (
        <SafeAreaView
            style={ {
                flex: 1,
                backgroundColor: Color.white,
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
                    resizeMode={ 'cover' }
                    source={ require('../../resources/images/LoginScreenImage.png') }></Image>
            </View>
            <View
                style={ {
                    flex: 1,
                    alignSelf: 'stretch',
                    paddingHorizontal: 26,
                    paddingTop: height * .15,
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
                onPressCallback={ Login }
                buttonColor={ Color.kakaoYellow }
                textColor={ Color.kakaoBrown }
                hasShadow={ false } />
        </SafeAreaView>
    );
};

export default LoginScreen;