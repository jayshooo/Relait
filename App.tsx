import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    StatusBar,
    Alert,
    Image,
} from 'react-native';
import SplashScreenHelper from 'react-native-splash-screen';
import RNRestart from 'react-native-restart';
import NetInfo from "@react-native-community/netinfo";

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './src/store/reducers';
import { showAlert } from './src/store/actions/ui/action';
import { Color } from './src/constants/styles';

declare const global: { HermesInternal: null | {}; };

const App = () => {

    const dispatch = useDispatch();
    const alertObj = useSelector((state: RootState) => state.ui.alertObj);

    useEffect(() => {

        const hideSplashScreen = setTimeout(() => {
            SplashScreenHelper.hide();
        }, 1500);

        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                // TODO 로그인 되어있지 않다면 로그인 스크린으로 이동
                // 로그인 되어있다면 메인 스크린으로 이동
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
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView
                style={ styles.view }>
                <Image
                    source={ require('./src/resources/icons/relaitLogo.png') }
                    resizeMode={ 'contain' }></Image>
            </SafeAreaView>
        </>
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


export default App;
