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
    isFixed: boolean;
}

export interface IListItem {
    item: ISeat;
    isFixed?: boolean;
    onPressTouchBar?: () => void;
    onPressPlace: (item: ISeat) => void;
}
