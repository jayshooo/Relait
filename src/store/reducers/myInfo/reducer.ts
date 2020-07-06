import { IMyInfoInitialState } from './types';
import { MyInfoActionTypes, SET_MY_INFO } from '../../actions/myinfo/types';
import { LOGIN_SUCCESS, LOGIN_FAILED } from '../../saga/types';

const initialState = {
    myInfo: null,
    isLogin: false,
    token: null,
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
                token: action.token,
                isLogin: action.isLogin,
            };
        default: return state;
    }
};

export default myInfo;