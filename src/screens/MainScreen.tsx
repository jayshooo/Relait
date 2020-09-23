import React, { useState, useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import { checkNotifications, check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

import RequestPermissionModal from '../modals/RequestPermissionModal';
import { TextSize, Color, FontWeight } from '../constants/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BottomSlideBar } from '../components/BottomSlideBar';
import { WriteButton } from '../components/WriteButton';
import { StatusBarHeight } from '../utils/Helpers';
import { MapContainer } from '../components/Maps';
import { IHeaderView } from './types/MainScreen';
import { getReverseGeocoding } from '../helpers/Geocoding';
import { ILocation } from '../helpers/types';
import { useDispatch, useSelector } from 'react-redux';
import { getSeats } from '../store/actions/seats/action';
import { RootState } from '../store/reducers';
import { setAuthorizationHeader } from '../constants/api';

const bottomHeight = 53;

const HeaderView = ({ currentAddress, goToReservationScreen, findMyLocation }: IHeaderView) => {

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
                        color: Color.grayTwo,
                    } }>현재 위치</Text>
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
                        fontWeight: FontWeight.bold,
                        flexShrink: 1,
                    } }>{ currentAddress }</Text>
                <TouchableOpacity
                    style={ {
                        marginLeft: 8,
                        borderWidth: 1,
                        borderRadius: 50,
                        borderColor: Color.grayTwo,
                        padding: 4,
                    } }
                    onPress={ findMyLocation }>
                    <Image source={ require('../resources/icons/Location.png') } />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const MainScreen = () => {

    const [ hasPermission, setHasPermission ] = useState(true);
    const [ showRequestPermissionModal, setShowRequestPermissionModal ] = useState(false);
    const [ showHeader, setShowHeader ] = useState(true);
    const [ myCoordination, setMyCoordination ] = useState<any>(null);
    const { token } = useSelector((state: RootState) => state.myInfo);

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

    const [ currentAddress, setCurrentAddress ] = useState('');

    const _getReverseGeocoding = async (coords: ILocation) => {
        const address = await getReverseGeocoding(coords);
        setCurrentAddress(address);
    };

    const dispatch = useDispatch();
    const _getSeats = async () => {
        try {
            setAuthorizationHeader(token!);
            await dispatch(getSeats());
        }
        catch (e) {
            throw new Error(e);
        }
    };

    useEffect(() => {

        if (!myCoordination) return;

        const { latitude, longitude } = myCoordination;

        _getReverseGeocoding({
            lat: latitude,
            lng: longitude,
        });

    }, [ myCoordination ]);

    useEffect(() => {

        checkPermissions();
        findMyLocation();

    }, []);

    useEffect(() => {
        !!token && _getSeats();
    }, [ token ]);

    const findMyLocation = () => {
        Geolocation.getCurrentPosition(info => {
            const { coords } = info;
            setMyCoordination(coords);
        }, error => {
            if (!error || Object.keys(error).length === 0) return;
            // TODO. 에러핸들링코드 추가
        }, {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 1000,
        });
    };

    const goToReservationScreen = () => {
        console.log('예약현황 스크린으로 이동');
    };

    const onPressWriteButton = () => {
        console.log('작성하기');
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
                { showHeader && (
                    <HeaderView
                        currentAddress={ currentAddress }
                        goToReservationScreen={ goToReservationScreen }
                        findMyLocation={ findMyLocation } />
                ) }
                <MapContainer
                    myCoordination={ myCoordination } />
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