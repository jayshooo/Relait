import { ISeat } from "../../store/reducers/seats/types";

export interface IPlaceDetailScreen {
    seat?: ISeat;
}

export interface ISection {
    title: string;
    description: string;
}
