import { IMyInfoInitialState } from "./types";
import { MyInfoActionTypes, SET_MY_INFO, LOGIN_SUCCESS, LOGIN_FAILED } from "../../actions/myinfo/types";
import { IProfile } from "@react-native-seoul/kakao-login";

const initialState = {
	myInfo: null,
	isLogin: false,
	token: null,
	mySeat: null,
};

const myInfo = (state: IMyInfoInitialState = initialState, action: MyInfoActionTypes) => {
	switch (action.type) {
	case SET_MY_INFO:

		if (!action.data) {
			return {
				...state,
			};
		}

		return {
			...state,
			myInfo: {
				...action.data as IProfile,
				id: Number(action.data.id),
			},
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
