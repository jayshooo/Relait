import { MyInfoInitialState } from '../../reducers/myInfo/types';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED } from '../../saga/types';

export const SET_MY_INFO = 'SET_MY_INFO';

interface SetMyInfoAction {
    type: typeof SET_MY_INFO;
    data: MyInfoInitialState[ 'myInfo' ];
}

interface SetIsLoginAction {
    type: typeof LOGIN_REQUEST | typeof LOGIN_SUCCESS | typeof LOGIN_FAILED;
    data: MyInfoInitialState[ 'isLogin' ];
}

export type MyInfoActionTypes = SetMyInfoAction | SetIsLoginAction;