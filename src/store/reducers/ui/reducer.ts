import { UiActionTypes } from '../../actions/ui/types';
import { UiInitialState } from './types';

const initialState = {
    alertObj: {
        visible: false,
        title: '',
        content: '',
        button: [],
        cancelable: false,
    }
};

const ui = (state: UiInitialState = initialState, action: UiActionTypes) => {
    switch (action.type) {
        case 'SHOW_ALERT':
            return {
                ...state,
                alertObj: {
                    visible: true,
                    ...action.data,
                }
            };
        case 'HIDE_ALERT':
            return {
                ...state,
                alertObj: {
                    visible: false,
                    title: '',
                    content: '',
                    button: [],
                    cancelable: false,
                }
            };
        default: return state;
    }
};

export default ui;