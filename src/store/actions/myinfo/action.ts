import { SET_MY_INFO } from './types';
import { IMyInfoInitialState } from '../../reducers/myInfo/types';

export const setMyInfo = (data: IMyInfoInitialState[ 'myInfo' ]) => ({
    type: SET_MY_INFO,
    data,
});
