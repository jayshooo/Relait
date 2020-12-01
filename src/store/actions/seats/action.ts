import { GET_SEATS_REQUEST, GET_SEATS_SUCCESS, GET_SEATS_FAILED, SET_SELECTED_SEAT, GET_MY_SEAT_REQUEST, GET_MY_SEAT_FAILED, GET_MY_SEAT_SUCCESS } from "./types";
import { httpClient } from "../../../constants/api";
import { Dispatch } from "redux";
import { ISeat } from "../../reducers/seats/types";

export const getSeats = () => async (dispatch: Dispatch) => {

	dispatch({
		type: GET_SEATS_REQUEST,
	});

	try {
		const result = await httpClient().get("/seat");

		const { status, data } = result;

		if (status === 200) {
			return dispatch({
				type: GET_SEATS_SUCCESS,
				seats: data.seats,
			});
		}

		return dispatch({
			type: GET_SEATS_FAILED,
			seats: null,
		});
	}
	catch (e) {
		return dispatch({
			type: GET_SEATS_FAILED,
			seats: null,
		});
	}

};

export const getMySeat = () => async (dispatch: Dispatch) => {

	// for test
	dispatch({
		type: GET_MY_SEAT_SUCCESS,
		seat: {
			"id": 123123,
			"giverId": 12,
			"leaveAt": 1587550606,
			"descriptionGiver": "파란색 후드티 입고 있습니다",
			"seatStatus": 1,
			"cafeName": "스타벅스 이대R점",
			"spaceKakaoMapId": 725420477,
			"address": "서울 서대문구 이화여대길 34",
			"lat": 37.558435,
			"lng": 126.945898,
			"havePlug": 0,
			"thumbnailUrl": "https://img1.daumcdn.net/thumb/T680x420/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fplace%2F0B921DBD85AF4DADB961ABDBD5437A03",
			"descriptionSeat": "창가 자리예요",
			"descriptionCloseTime": 1587550606,
			"takerId": 12,
			"takenAt": 1587550606,
		},
	});

	// dispatch({
	// 	type: GET_MY_SEAT_REQUEST,
	// });

	// try {
	// 	const result = await httpClient().get("/status");

	// 	const { status, data } = result;

	// 	if (status === 204) {
	// 		return dispatch({
	// 			type: GET_MY_SEAT_SUCCESS,
	// 			seat: null,
	// 		});
	// 	}

	// 	return dispatch({
	// 		type: GET_MY_SEAT_SUCCESS,
	// 		seat: data,
	// 	});

	// }
	// catch (e) {
	// 	return dispatch({
	// 		type: GET_MY_SEAT_FAILED,
	// 		seat: null,
	// 	});
	// }
};

export const setSelectedSeat = (seat: ISeat | null) => (dispatch: Dispatch) => {

	dispatch({
		type: SET_SELECTED_SEAT,
		seat,
	});

};
