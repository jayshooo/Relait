import { IMyInfoInitialState } from './types';
import { MyInfoActionTypes, SET_MY_INFO } from '../../actions/myinfo/types';
import { LOGIN_SUCCESS, LOGIN_FAILED } from '../../saga/types';

const initialState = {
    myInfo: null,
    isLogin: false,
};

const myInfo = (state: IMyInfoInitialState = initialState, action: MyInfoActionTypes) => {
    switch (action.type) {
        case SET_MY_INFO:
            return {
                ...state,
                myInfo: action.data,
            };
        case LOGIN_SUCCESS:
        case LOGIN_FAILED:
            return {
                ...state,
                isLogin: action.data,
            };
        default: return state;
    }
};

export default myInfo;