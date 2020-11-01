import React, { useState, useEffect, RefObject } from 'react';
import { Text, View, Image, Dimensions } from 'react-native';
import { checkNotifications, check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

import RequestPermissionModal from '../modals/RequestPermissionModal';
import { TextSize, Color, FontWeight } from '../constants/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BottomSlideBar } from '../components/BottomSlideBar';
import { WriteButton } from '../components/WriteButton';
import { Button } from '../components/forms/Button';
import { StatusBarHeight, moveCamera } from '../utils/Helpers';
import { MapContainer } from '../components/Maps';
import { IHeaderView } from './types/MainScreen';
import { getReverseGeocoding } from '../helpers/Geocoding';
import { ILocation } from '../helpers/types';
import { useDispatch, useSelector } from 'react-redux';
import { getSeats } from '../store/actions/seats/action';
import { RootState } from '../store/reducers';
import { setAuthorizationHeader } from '../constants/api';
import MapView from 'react-native-maps';
import { ISeat } from '../store/reducers/seats/types';
import { useNavigation } from '@react-navigation/native';

const bottomHeight = 53;
const { width } = Dimensions.get('window');

const makeSpotPanel = ({ seat, onPress }: { seat: null | ISeat; onPress: () => void; }) => {

    const hasSeat = !!seat;
    const spotName = hasSeat ? seat!.cafeName : '어디서 작업 중이야?';
    const backgroundColor = hasSeat ? Color.purplishBlue : Color.gray;
    const color = hasSeat ? Color.white : Color.grayTwo;
    const label = '장소 선택하기';

    return (
        <View
            style={ {
                position: "absolute",
                bottom: 0,
                left: 0,
                width,
                padding: 24,
                borderTopLeftRadius: 16,
                borderTopRightRadius: 8,
                backgroundColor: Color.white,
            } }>
            <View
                style={ {
                    flex: 1,
                    borderWidth: 1,
                    borderRadius: 16,
                    borderColor: Color.gray,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                } }>
                <Text
                    style={ {
                        marginTop: 2,
                        fontSize: TextSize.h4,
                        fontWeight: FontWeight.bold,
                        color: hasSeat ? Color.darkTwo : Color.gray,
                    } }>{ spotName }</Text>
                <Image style={ {
                    width: 32,
                    height: 32,
                } } source={ require('../resources/icons/SearchIcon.png') }></Image>
            </View>
            <Button
                onPress={ onPress }
                label={ label }
                backgroundColor={ backgroundColor }
                color={ color } />
        </View>
    );
};

const HeaderView = ({ goBack, makeSpot, currentAddress, goToReservationScreen, findMyLocation }: IHeaderView) => {

    if (makeSpot) {
        return (
            <View
                onStartShouldSetResponder={ () => {
                    return true;
                } }
                style={ {
                    position: "absolute",
                    left: 24,
                    top: 12 + StatusBarHeight,
                    zIndex: 1,
                } }>
                <TouchableOpacity
                    activeOpacity={ .7 }
                    onPress={ goBack }>
                    <Image
                        source={ require('../resources/icons/BackBtn.png') }></Image>
                </TouchableOpacity>
            </View>
        );
    }

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
    const [ mapRefObj, setMapRefObj ] = useState<RefObject<MapView> | null>(null);
    const [ makeSpot, setMakeSpot ] = useState(false);
    const [ selectedSeat, setSelectedSeat ] = useState<ISeat | null>(null);

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

    const navigation = useNavigation();

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
        setMakeSpot(true);
    };

    const onPressItem = (seat: ISeat) => {
        if (!mapRefObj) return;
        const { lat, lng } = seat;
        moveCamera({
            mapRef: mapRefObj,
            lat,
            lng,
        });
        setSelectedSeat(seat);
        setMakeSpot(true);
        setShowHeader(true);
    };

    const navigateToMakeSpotScreen = () => {
        if (!selectedSeat) return;
        navigation.navigate('RegisterPlaceScreen', {
            selectedSeat,
        });
    };

    const goBack = () => {
        setSelectedSeat(null);
        setMakeSpot(false);
    };

    const bottomView = () => {
        if (makeSpot) {
            return makeSpotPanel({
                seat: selectedSeat,
                onPress: navigateToMakeSpotScreen,
            });
        }

        return (
            <BottomSlideBar
                onPressItem={ (seat: ISeat) => {
                    onPressItem(seat);
                } }
                bottomHeight={ bottomHeight }
                setShowHeader={ setShowHeader } />
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
                { showHeader && (
                    <HeaderView
                        goBack={ goBack }
                        makeSpot={ makeSpot }
                        currentAddress={ currentAddress }
                        goToReservationScreen={ goToReservationScreen }
                        findMyLocation={ findMyLocation } />
                ) }
                <MapContainer
                    setMapRefObj={ (mapRef: RefObject<MapView>) => {
                        setMapRefObj(mapRef);
                    } }
                    onPressItem={ (seat: ISeat) => {
                        onPressItem(seat);
                    } }
                    myCoordination={ myCoordination } />
                { !makeSpot && <WriteButton
                    bottomHeight={ bottomHeight }
                    onPressWriteButton={ onPressWriteButton } /> }
                <RequestPermissionModal
                    visible={ showRequestPermissionModal }
                    onRequestClose={ () => {
                        setHasPermission(true);
                    } } />
            </View>
            { bottomView() }
        </View>
    );
};

export default MainScreen;