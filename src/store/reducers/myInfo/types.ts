import { IProfile } from '@react-native-seoul/kakao-login';

export interface IMyInfoInitialState {
    myInfo: IProfile | null;
    isLogin: boolean;
}