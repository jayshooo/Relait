import { SET_MY_INFO, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED } from "./types";
import { IMyInfoInitialState } from "../../reducers/myInfo/types";
import { Dispatch } from "redux";
import { httpClient } from "../../../constants/api";

export const doLogin = (uniqueId: string) => async (dispatch: Dispatch) => {

	dispatch({
		type: LOGIN_REQUEST,
	});

	try {
		const result = await httpClient().post("/user/login", {
			uniqueId,
		});

		const { status, data } = result;

		if (status === 200) {
			return dispatch({
				type: LOGIN_SUCCESS,
				token: `Bearer ${data.token}`,
				isLogin: true,
			});
		}

		return dispatch({
			type: LOGIN_FAILED,
			token: null,
			isLogin: false,
		});
	}
	catch (e) {
		return dispatch({
			type: LOGIN_FAILED,
			token: null,
			isLogin: false,
		});
	}

};

export const setMyInfo = (data: IMyInfoInitialState[ "myInfo" ]) => (dispatch: Dispatch) => {
	return dispatch({
		type: SET_MY_INFO,
		data,
	});
};
