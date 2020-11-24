export enum PickerEnum {
    "open" = "open",
    "close" = "close",
    "descriptionCloseTime" = "descriptionCloseTime"
}

export interface SectionHeaderInterface {
    title: string;
}

export interface CheckboxButtonInterface {
    title: string;
    isChecked: number;
    onPressCheckboxButton: () => void;
}

export type RegisterTimeType = {[key in PickerEnum]: { epoch: number, time: string }};

export interface RegisterDataInterface {
    descriptionSeat: string;
    descriptionGiver: string;
    havePlug: number;
}
