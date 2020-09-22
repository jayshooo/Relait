import { SlidingUpPanelAnimationConfig } from 'rn-sliding-up-panel';

export interface ITouchupBar {
    showText?: boolean;
    onPress?: (value?: number | SlidingUpPanelAnimationConfig) => void;
}

export interface IBottomSlideBar {
    bottomHeight: number;
    setShowHeader: (status: boolean) => void;
}