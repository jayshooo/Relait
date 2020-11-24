import { GET_SEATS_REQUEST, GET_SEATS_SUCCESS, GET_SEATS_FAILED, SET_SELECTED_SEAT } from "./types";
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

export const setSelectedSeat = (seat: ISeat | null) => (dispatch: Dispatch) => {

	dispatch({
		type: SET_SELECTED_SEAT,
		seat,
	});

};
