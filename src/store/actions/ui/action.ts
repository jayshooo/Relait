import { SHOW_ALERT, HIDE_ALERT, AlertContentInterface } from './types';

export const showAlert = (data: AlertContentInterface) => ({
    type: SHOW_ALERT,
    data,
});

export const hideAlert = () => ({
    type: HIDE_ALERT,
});