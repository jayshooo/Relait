import React, { useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Image,
} from 'react-native';
import SplashScreenHelper from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';
import RNRestart from 'react-native-restart';
import NetInfo from "@react-native-community/netinfo";

import { useDispatch, useSelector } from 'react-redux';
import { showAlert } from '../store/actions/ui/action';
import { Color } from '../constants/styles';
import { ASYNC_STORAGE_LOGIN_KEY } from '../constants/constants';
import { ISplashScreenProps } from './types/SplashScreen';
import { setMyInfo } from '../store/actions/myinfo/action';
import KakaoLogins from '@react-native-seoul/kakao-login';
import { RootState } from '../store/reducers';

const SplashScreen = ({ navigation }: ISplashScreenProps) => {

    const dispatch = useDispatch();
    const myInfo = useSelector((state: RootState) => state.myInfo);

    console.log('====================================');
    console.log(myInfo);
    console.log('====================================');

    useEffect(() => {

        setTimeout(() => {
            SplashScreenHelper.hide();
        }, 2000);

        const getIsLogin = async (): Promise<boolean> => {
            // for test
            await AsyncStorage.removeItem(ASYNC_STORAGE_LOGIN_KEY);
            const result = await AsyncStorage.getItem(ASYNC_STORAGE_LOGIN_KEY);
            return !!result;
        };

        const checkNetInfo = async () => {

            try {
                const netInfoResult = await NetInfo.fetch();

                const { isConnected } = netInfoResult;

                if (isConnected) {
                    const isLogin = await getIsLogin();
                    if (!isLogin) {
                        // 로그인 되어있지 않으면 로그인 화면으로 이동
                        navigation.replace('LoginScreen');
                    }
                    else {
                        const getProfileResult = await KakaoLogins.getProfile();
                        dispatch(setMyInfo(getProfileResult));
                        // 로그인 되어있으면 메인화면으로 이동
                        navigation.replace('MainScreen');
                    }
                }
                else {
                    dispatch(showAlert({
                        title: '네트워크 오류',
                        content: '네트워크 연결상태 확인좀;;',
                        buttons: [
                            {
                                text: "닫기",
                                style: "default",
                            },
                            {
                                text: "다시시도",
                                onPress: () => {
                                    RNRestart.Restart();
                                },
                            },
                        ],
                        cancelable: false,
                    }));
                }
            }
            catch (e) {
                throw new Error(e);
            }
        };

        checkNetInfo();

    }, []);

    return (
        <SafeAreaView
            style={ styles.view }>
            <Image
                source={ require('../resources/icons/RelaitLogo.png') }
                resizeMode={ 'contain' }></Image>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.purplishBlue,
    },
});


export default SplashScreen;
