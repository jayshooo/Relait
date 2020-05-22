import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { checkNotifications, check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import RequestPermissionModal from '../modals/RequestPermissionModal';

const MainScreen = () => {

    const [ hasPermission, setHasPermission ] = useState(false);

    useEffect(() => {
        const hasLocationPermission = () => {
            return check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
                if (result !== RESULTS.GRANTED) {
                    return false;
                }
                return true;
            }).catch(e => {
                throw new Error(e);
            });
        };

        const hasNotificationPermission = () => {
            return checkNotifications().then(({ status }) => {
                if (status !== RESULTS.GRANTED) {
                    return false;
                }
                return true;
            }).catch(e => {
                throw new Error(e);
            });
        };

        if (hasLocationPermission() && hasNotificationPermission()) {
            setHasPermission(true);
        }

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
                    visible={ !hasPermission }
                    onRequestClose={ () => {
                        setHasPermission(true);
                    } } />
            </View>
        </SafeAreaView>
    );
};

export default MainScreen;