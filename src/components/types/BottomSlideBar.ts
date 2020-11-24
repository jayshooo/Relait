import { SlidingUpPanelAnimationConfig } from "rn-sliding-up-panel";
import { ISeat } from "../../store/reducers/seats/types";

export interface ITouchupBar {
    showText?: boolean;
    onPress?: (value?: number | SlidingUpPanelAnimationConfig) => void;
}

export interface IBottomSlideBar {
    bottomHeight: number;
    setShowHeader: (status: boolean) => void;
    onPressPlace: (seat: ISeat) => void;
    isFiltered: boolean;
    seats: ISeat[] | null;
}
