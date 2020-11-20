export enum PickerEnum {
    "open" = "open",
    "close" = "close",
    "closePlace" = "closePlace"
}

export interface SectionHeaderInterface {
    title: string;
}

export interface CheckboxButtonInterface {
    title: string;
    isChecked: boolean;
    onPress: () => void;
}

export type RegisterTimeType = {[key in PickerEnum]: { epoch: number, time: string }};
