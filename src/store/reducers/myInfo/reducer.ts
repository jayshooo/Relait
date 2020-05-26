import { MyInfoInitialState } from './types';
import { MyInfoActionTypes } from '../../actions/myinfo/types';

const initialState = {
    myInfo: null,
};

const myInfo = (state: MyInfoInitialState = initialState, action: MyInfoActionTypes) => {
    switch (action.type) {
        case 'SET_MY_INFO':
            return {
                ...state,
                myInfo: action.data,
            };
        default: return state;
    }
};

export default myInfo;