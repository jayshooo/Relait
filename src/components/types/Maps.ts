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
    title?: string;
    mapReady: boolean;
    onPressMarker: () => void;
}