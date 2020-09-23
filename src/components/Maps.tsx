import React, { useRef, useEffect } from 'react';
import { IMapMarker, IMapContainer } from './types/Maps';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
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

export const MapContainer: React.FC<IMapContainer> = ({ myCoordination, onPressItem, setMapRefObj }) => {

    if (!myCoordination) return null;

    const { latitude, longitude } = myCoordination;
    const seats = useSeats();

    let mapRef = useRef<MapView | null>(null);

    useEffect(() => {

        if (!mapRef || !myCoordination) return;

        setMapRefObj(mapRef);

        const { latitude, longitude } = myCoordination;

        mapRef.current!.animateCamera({
            center: {
                latitude,
                longitude,
            },
            zoom: 18,
        }, {
            duration: 50,
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
                        onPressItem(seat);
                    } }
                />;
            }) }
        </MapView>
    );
};