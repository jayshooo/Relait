import { IMyInfoInitialState } from '../../reducers/myInfo/types';

export const SET_MY_INFO = 'SET_MY_INFO';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

interface SetMyInfoAction {
    type: typeof SET_MY_INFO;
    data: IMyInfoInitialState[ 'myInfo' ];
}

interface SetIsLoginAction {
    type: typeof LOGIN_REQUEST | typeof LOGIN_SUCCESS | typeof LOGIN_FAILED;
    isLogin: IMyInfoInitialState[ 'isLogin' ];
    token: IMyInfoInitialState[ 'token' ];
}

export type MyInfoActionTypes = SetMyInfoAction | SetIsLoginAction;