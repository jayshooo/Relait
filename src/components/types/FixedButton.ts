import { ISeat } from "../../store/reducers/seats/types";

export interface IFixedButton {
    seat: ISeat;
    setBottomButtonHeight?: (height: number) => void;
}
