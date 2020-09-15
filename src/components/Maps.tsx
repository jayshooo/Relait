import React, { useState, useRef, useEffect } from 'react';
import { IMapMarker, IMapContainer } from './types/Maps';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducers';

export const MapMarker = ({ lat, lng, title, mapReady, onPressMarker, isMyLocation = false }: IMapMarker) => {

    return (
        <Marker
            title={ title }
            coordinate={ {
                latitude: lat,
                longitude: lng,
            } }
            image={ isMyLocation ? require('../resources/icons/MyLocationMarker.png') : require('../resources/icons/Marker.png') }
            onPress={ onPressMarker }
            tracksViewChanges={ true } />
    );
};

export const MapContainer: React.FC<IMapContainer> = ({ myCoordination }) => {

    if (!myCoordination) return null;

    const { latitude, longitude } = myCoordination;
    const [ mapReady, setMapReady ] = useState(false);
    const seats = useSelector((state: RootState) => state.seats.seats);

    const onPressMarker = () => {
        console.log('====================================');
        console.log('선택했다.');
        console.log('====================================');
    };

    const mapRef = useRef<MapView | null>(null);

    useEffect(() => {

        if (!mapRef || !myCoordination) return;

        const { latitude, longitude } = myCoordination;

        setMapReady(true);

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
            onMapReady={ () => {
                setTimeout(() => {
                    setMapReady(true);
                }, 200);
            } }
            provider={ PROVIDER_GOOGLE }
            style={ {
                flex: 1,
            } }>
            <MapMarker
                mapReady={ mapReady }
                lat={ latitude }
                lng={ longitude }
                onPressMarker={ onPressMarker }
                isMyLocation={ true } />
        </MapView>
    );
};