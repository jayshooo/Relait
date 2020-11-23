import { ISeat } from "../../store/reducers/seats/types";
import { RefObject } from "react";
import MapView from "react-native-maps";

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
    onPressPlace: (seat: ISeat) => void;
    setMapRefObj: (mapRef: RefObject<MapView>) => void;
}

export interface IMapMarker {
    lat: number;
    lng: number;
    onPressMarker?: () => void;
    isMyLocation?: boolean;
}
