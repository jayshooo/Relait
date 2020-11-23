import { FontWeight } from "../../constants/styles";
import { ISeat } from "../../store/reducers/seats/types";

export interface IPlugView {
    hasPlug: boolean;
    fontSize?: number;
    fontWeight?: FontWeight;
    iconSize?: {
        width: number,
        height: number,
    };
}

export interface IListComponent extends Partial<ISeat> {
    onPressPlace: () => void;
}
