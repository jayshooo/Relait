import {
    AlertButton,
} from 'react-native';

export const SHOW_ALERT = 'SHOW_ALERT';
export const HIDE_ALERT = 'HIDE_ALERT';

export interface AlertContentInterface {
    title: string;
    content: string;
    buttons: AlertButton[];
    cancelable: boolean;
}

interface ShowAlertAction {
    type: typeof SHOW_ALERT,
    data: AlertContentInterface,
}

interface hideAlertAction {
    type: typeof HIDE_ALERT,
}

export type UiActionTypes = ShowAlertAction | hideAlertAction;