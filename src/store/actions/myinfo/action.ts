import { SET_MY_INFO } from './types';
import { MyInfoInitialState } from '../../reducers/myInfo/types';

export const setMyInfo = (data: MyInfoInitialState[ 'myInfo' ]) => ({
    type: SET_MY_INFO,
    data,
});
