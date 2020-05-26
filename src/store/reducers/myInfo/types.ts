import { IProfile } from '@react-native-seoul/kakao-login';

export interface MyInfoInitialState {
    myInfo: IProfile | null;
    isLogin: boolean;
}