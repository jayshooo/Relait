import { SlidingUpPanelAnimationConfig } from 'rn-sliding-up-panel';

export interface ITouchupBar {
    showText?: boolean;
    onPress?: (value?: number | SlidingUpPanelAnimationConfig) => void;
}

export interface IBottmoSlideBar {
    bottomHeight: number;
    setShowHeader: (status: boolean) => void;
}