import React, { useState } from 'react';
import { IMapMarker, IMapContainer } from './types/Maps';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

export const MapMarker = ({ lat, lng, title, mapReady, onPressMarker }: IMapMarker) => {
    return (
        <Marker
            title={ title }
            coordinate={ {
                latitude: lat,
                longitude: lng,
            } }
            image={ require('../resources/icons/Marker.png') }
            icon={ require('../resources/icons/Marker.png') }
            onPress={ onPressMarker }
            tracksViewChanges={ !mapReady } />
    );
};

export const MapContainer: React.FC<IMapContainer> = ({ coordination }) => {

    if (!coordination) return null;

    const { latitude, longitude } = coordination;
    const [ mapReady, setMapReady ] = useState(false);

    const onPressMarker = () => {
        console.log('====================================');
        console.log('선택했다.');
        console.log('====================================');
    };

    return (
        <MapView
            onMapReady={ () => {
                setTimeout(() => setMapReady(true), 100);
            } }
            provider={ PROVIDER_GOOGLE }
            style={ {
                flex: 1,
            } }
            initialRegion={ {
                latitude,
                longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            } }>
            <MapMarker
                mapReady={ mapReady }
                lat={ latitude }
                lng={ longitude }
                onPressMarker={ onPressMarker } />
        </MapView>
    );
};