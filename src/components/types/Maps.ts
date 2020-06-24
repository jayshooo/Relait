export interface IMapContainer {
    coordination: any;
}

export interface IMapMarker {
    lat: number;
    lng: number;
    title?: string;
    mapReady: boolean;
    onPressMarker: () => void;
}