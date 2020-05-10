import { AlertContentInterface } from 'src/store/actions/ui/types';

interface AlertObjInterface extends AlertContentInterface {
    visible: boolean;
}

export interface UiInitialState {
    alertObj: AlertObjInterface;
}