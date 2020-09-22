import React, { useState, useRef, useEffect } from 'react';
import { IMapMarker, IMapContainer } from './types/Maps';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { ISeat } from '../store/reducers/seats/types';
import { useSeats } from '../utils/Hooks';

export const MapMarker = ({ lat, lng, onPressMarker, isMyLocation = false }: IMapMarker) => {

    return (
        <Marker
            coordinate={ {
                latitude: lat,
                longitude: lng,
            } }
            image={ isMyLocation ? require('../resources/icons/MyLocationMarker.png') : require('../resources/icons/Marker.png') }
            onPress={ () => {
                if (!onPressMarker) return;
                onPressMarker();
            } }
            tracksViewChanges={ true } />
    );
};

export const MapContainer: React.FC<IMapContainer> = ({ myCoordination }) => {

    if (!myCoordination) return null;

    const { latitude, longitude } = myCoordination;
    const seats = useSeats();

    const onPressMarker = (seat: ISeat) => {
        console.log('====================================');
        console.log(seat);
        console.log('====================================');
    };

    const mapRef = useRef<MapView | null>(null);

    useEffect(() => {

        if (!mapRef || !myCoordination) return;

        const { latitude, longitude } = myCoordination;

        mapRef.current!.animateCamera({
            center: {
                latitude,
                longitude,
            },
            zoom: 17,
        }, {
            duration: 200,
        });

    }, [ myCoordination ]);

    return (
        <MapView
            ref={ mapRef }
            provider={ PROVIDER_GOOGLE }
            style={ {
                flex: 1,
            } }>
            <MapMarker
                lat={ latitude }
                lng={ longitude }
                isMyLocation={ true } />
            { seats && seats.map(seat => {
                return <MapMarker
                    key={ seat.id }
                    lat={ seat.lat }
                    lng={ seat.lng }
                    onPressMarker={ () => {
                        onPressMarker(seat);
                    } }
                />;
            }) }
        </MapView>
    );
};