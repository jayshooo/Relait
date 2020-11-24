import { SlidingUpPanelAnimationConfig } from "rn-sliding-up-panel";
import { ISeat } from "../../store/reducers/seats/types";

export interface ITouchupBar {
    showText?: boolean;
    onPress?: (value?: number | SlidingUpPanelAnimationConfig) => void;
    isFixed?: boolean;
}

export interface IBottomSlideBar {
    bottomHeight: number;
    setShowHeader: (status: boolean) => void;
    onPressPlace: (seat: ISeat) => void;
    isFiltered: boolean;
    seats: ISeat[] | null;
}

export interface IFixedBottomBar {
    onPressPlace: (seat: ISeat) => void;
    setHeight?: (height: number) => void;
    seats: ISeat[] | null;
}
