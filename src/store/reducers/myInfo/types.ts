import { IProfile } from "@react-native-seoul/kakao-login";

export enum userRole {
    "TAKER",
    "GIVER"
}

export interface IMyInfoInitialState {
    myInfo: IProfile | null;
    isLogin: boolean;
    token: string | null;
}
