import { UiActionTypes } from '../../actions/ui/types';
import { UiInitialState } from './types';

const initialState = {
    showAlert: false,
};

const ui = (state: UiInitialState = initialState, action: UiActionTypes) => {
    switch (action.type) {
        case 'SHOW_ALERT':
            return {
                ...state,
            };
        case 'HIDE_ALERT':
            return {
                ...state,
            };
        default: return state;
    }
};

export default ui;