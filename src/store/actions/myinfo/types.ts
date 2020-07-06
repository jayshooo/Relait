import { IMyInfoInitialState } from '../../reducers/myInfo/types';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED } from '../../saga/types';

export const SET_MY_INFO = 'SET_MY_INFO';

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