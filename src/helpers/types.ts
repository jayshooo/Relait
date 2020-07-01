export interface ILocation {
    lat: number;
    lng: number;
}

export type TGetReverseGeocoding = ({ lat, lng }: Partial<ILocation>) => Promise<string>;