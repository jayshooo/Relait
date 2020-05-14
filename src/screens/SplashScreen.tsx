import React, { useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Alert,
    Image,
} from 'react-native';
import SplashScreenHelper from 'react-native-splash-screen';
import RNRestart from 'react-native-restart';
import NetInfo from "@react-native-community/netinfo";

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/reducers';
import { showAlert } from '../store/actions/ui/action';
import { Color } from '../constants/styles';
import { ISplashScreenProps } from './types/SplashScreen';

const SplashScreen = ({ navigation }: ISplashScreenProps) => {

    const dispatch = useDispatch();
    const alertObj = useSelector((state: RootState) => state.ui.alertObj);

    useEffect(() => {

        const hideSplashScreen = setTimeout(() => {
            SplashScreenHelper.hide();
        }, 1500);

        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                const isLogin = false;
                if (!isLogin) {
                    // 로그인 되어있지 않으면 로그인 화면으로 이동
                    navigation.replace('LoginScreen');
                    return;
                }
                // 로그인 되어있으면 메인화면으로 이동
            }
            else {
                dispatch(showAlert({
                    title: '네트워크 오류',
                    content: '네트워크 연결상태 확인좀;;',
                    button: [
                        {
                            text: "닫기",
                            onPress: null,
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
        });

        return () => {
            clearTimeout(hideSplashScreen);
        };

    }, []);

    useEffect(() => {

        if (alertObj.visible) {
            Alert.alert(alertObj.title, alertObj.content, alertObj.button, {
                cancelable: alertObj.cancelable,
            });
        }

    }, [ alertObj.visible ]);

    return (
        <SafeAreaView
            style={ styles.view }>
            <Image
                source={ require('../resources/icons/relaitLogo.png') }
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
