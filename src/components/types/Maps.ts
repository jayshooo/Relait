import { ISeat } from '../../store/reducers/seats/types';

export interface IMapContainer {
    myCoordination: {
        accuracy: number;
        altitude: number;
        altitudeAccuracy: number;
        heading: number;
        latitude: number;
        longitude: number;
        speed: number;
    };
}

export interface IMapMarker {
    lat: number;
    lng: number;
    onPressMarker?: () => void;
    isMyLocation?: boolean;
}