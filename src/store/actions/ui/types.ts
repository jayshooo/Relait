import { RefObject } from "react";
import { AlertButton } from "react-native";
import MapView from "react-native-maps";

export const SHOW_ALERT = "SHOW_ALERT";
export const HIDE_ALERT = "HIDE_ALERT";

export const SET_MAP_REF = "SET_MAP_REF";

export interface AlertContentInterface {
    title: string;
    content: string;
    buttons: AlertButton[];
    cancelable: boolean;
}

export interface SetMapRefInterface {
    map: RefObject<MapView> | null;
}

interface ShowAlertAction {
    type: typeof SHOW_ALERT;
    data: AlertContentInterface;
}

interface HideAlertAction {
    type: typeof HIDE_ALERT;
}

interface SetMapRefAction {
    type: typeof SET_MAP_REF;
    map: SetMapRefInterface["map"];
}

export type UiActionTypes = ShowAlertAction | HideAlertAction | SetMapRefAction;
