import { MyInfoInitialState } from '../../reducers/myInfo/types';

export const SET_MY_INFO = 'SET_MY_INFO';

interface SetMyInfoAction {
    type: typeof SET_MY_INFO;
    data: MyInfoInitialState[ 'myInfo' ];
}

export type MyInfoActionTypes = SetMyInfoAction;