import React, { useState } from 'react';
import { IMapMarker, IMapContainer } from './types/Maps';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

const MapMarker = ({ lat, lng, title }: IMapMarker) => {
    return (
        <Marker
            title={ title }
            coordinate={ {
                latitude: lat,
                longitude: lng,
            } }
            image={ require('../resources/icons/Marker.png') }
            onPress={ () => {
                console.log('====================================');
                console.log('선택했다.');
                console.log('====================================');
            } } />
    );
};

export const MapContainer: React.FC<IMapContainer> = ({ onTransitionEnd = true }) => {

    if (!onTransitionEnd) return null;

    return (
        <MapView
            provider={ PROVIDER_GOOGLE }
            style={ {
                flex: 1,
            } }
            initialRegion={ {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            } }>
            <MapMarker
                lat={ 37.78825 }
                lng={ -122.4324 } />
        </MapView>
    );
};