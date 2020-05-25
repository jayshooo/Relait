import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { checkNotifications, check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import RequestPermissionModal from '../modals/RequestPermissionModal';

const MainScreen = () => {

    const [ hasPermission, setHasPermission ] = useState(true);
    const [ showRequestPermissionModal, setShowRequestPermissionModal ] = useState(false);

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

    return (
        <SafeAreaView
            style={ { flex: 1, } }>
            <View
                style={ {
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                } }>
                <Text>나는야 메인 스크린 ^오^</Text>
                <RequestPermissionModal
                    visible={ showRequestPermissionModal }
                    onRequestClose={ () => {
                        setHasPermission(true);
                    } } />
            </View>
        </SafeAreaView>
    );
};

export default MainScreen;