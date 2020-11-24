import { ISeat } from "../../store/reducers/seats/types";
import { RefObject } from "react";
import MapView from "react-native-maps";
import { StyleProp, ViewStyle } from "react-native";

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
    mapStyle: StyleProp<ViewStyle>;
}

export interface IMapMarker {
    id?: number;
    lat: number;
    lng: number;
    onPressMarker?: () => void;
    isMyLocation?: boolean;
}
