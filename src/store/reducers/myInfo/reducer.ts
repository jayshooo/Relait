import { MyInfoInitialState } from './types';
import { MyInfoActionTypes } from '../../actions/myinfo/types';

const initialState = {
    myInfo: null,
    isLogin: false,
};

const myInfo = (state: MyInfoInitialState = initialState, action: MyInfoActionTypes) => {
    switch (action.type) {
        case 'SET_MY_INFO':
            return {
                ...state,
                myInfo: action.data,
            };
        case 'LOGIN_SUCCESS':
        case 'LOGIN_FAILED':
            return {
                ...state,
                isLogin: action.data,
            };
        default: return state;
    }
};

export default myInfo;