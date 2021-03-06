import { AlertContentInterface, SetMapRefInterface } from "../../actions/ui/types";

interface AlertObjInterface extends AlertContentInterface {
    visible: boolean;
}

export interface UiInitialState {
    alertObj: AlertObjInterface;
    map: SetMapRefInterface["map"];
}
