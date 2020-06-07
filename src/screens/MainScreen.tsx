import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, StyleProp, TextStyle, Image } from 'react-native';
import { checkNotifications, check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import RequestPermissionModal from '../modals/RequestPermissionModal';
import { TextSize, TextWeight, Color } from '../constants/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BottomSlideBar } from '../components/BottomSlideBar';
import { WriteButton } from '../components/WriteButton';
import { StatusBarHeight } from '../utils/Helpers';

const bottomHeight = 53;

const MapView = () => {
    return (
        <View
            style={ {
                flex: 1,
                backgroundColor: Color.kakaoYellow,
                justifyContent: 'center',
                alignItems: 'center',
            } }>
            <Text>맵뷰영역</Text>
        </View>
    );
};

const MainScreen = () => {

    const [ hasPermission, setHasPermission ] = useState(true);
    const [ showRequestPermissionModal, setShowRequestPermissionModal ] = useState(false);
    const [ showHeader, setShowHeader ] = useState(true);

    useEffect(() => {

        setShowRequestPermissionModal(!hasPermission);

    }, [ hasPermission ]);

    const hasLocationPermission = async () => {

        try {
            const result = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

            if (result !== RESULTS.GRANTED) {
                return false;
            }
            return true;
        }
        catch (e) {
            throw new Error(e);
        }

    };

    const hasNotificationPermission = async () => {

        try {
            const result = await checkNotifications();
            const { status } = result;

            if (status !== RESULTS.GRANTED) {
                return false;
            }
            return true;
        }
        catch (e) {
            throw new Error(e);
        }

    };

    const checkPermissions = async () => {
        if (!await hasLocationPermission() || !await hasNotificationPermission()) {
            setHasPermission(false);
        }
    };

    useEffect(() => {

        checkPermissions();

    }, []);

    const findMyLocation = () => {
        console.log('내 위치 찾기');
    };

    const goToReservationScreen = () => {
        console.log('예약현황 스크린으로 이동');
    };

    const onPressWriteButton = () => {
        console.log('작성하기');
    };

    const HeaderView = () => {
        return (
            <View
                style={ {
                    paddingTop: 38 + StatusBarHeight,
                    paddingBottom: 24,
                    paddingHorizontal: 24,
                } }>
                <View
                    style={ {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                    } }>
                    <Text
                        style={ {
                            fontSize: TextSize.h5,
                            color: Color.gray2,
                        } as StyleProp<TextStyle> }>현재 위치</Text>
                    <TouchableOpacity
                        onPress={ goToReservationScreen }>
                        <Image source={ require('../resources/icons/BookingIcon.png') } />
                    </TouchableOpacity>
                </View>
                <View
                    style={ {
                        marginTop: 4,
                        flexDirection: 'row',
                        alignItems: 'center',
                    } }>
                    <Text
                        style={ {
                            fontSize: TextSize.h2,
                            fontWeight: TextWeight.bold,
                        } as StyleProp<TextStyle> }>서울특별시 마포구 연남동</Text>
                    <TouchableOpacity
                        style={ {
                            marginLeft: 8,
                            borderWidth: 1,
                            borderRadius: 50,
                            borderColor: Color.gray2,
                            padding: 4,
                        } }
                        onPress={ findMyLocation }>
                        <Image source={ require('../resources/icons/Location.png') } />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View
            style={ {
                flex: 1,
                backgroundColor: Color.white,
            } }>
            <View
                style={ {
                    flex: 1,
                } }>
                { showHeader && HeaderView() }
                <MapView />
                <WriteButton
                    bottomHeight={ bottomHeight }
                    onPressWriteButton={ onPressWriteButton } />
                <RequestPermissionModal
                    visible={ showRequestPermissionModal }
                    onRequestClose={ () => {
                        setHasPermission(true);
                    } } />
            </View>
            <BottomSlideBar
                bottomHeight={ bottomHeight }
                setShowHeader={ setShowHeader } />
        </View>
    );
};

export default MainScreen;