import { ISeatsInitialState } from "./types";
import { SeatsActionTypes, GET_SEATS_SUCCESS, GET_SEATS_FAILED, SET_SELECTED_SEAT, GET_MY_SEAT_SUCCESS } from "../../actions/seats/types";

const initialState = {
	seats: [],
	selectedSeat: null,
	mySeat: null,
};

const seats = (state: ISeatsInitialState = initialState, action: SeatsActionTypes) => {
	switch (action.type) {
	case GET_SEATS_SUCCESS:
		return {
			...state,
			seats: action.seats,
		};
	case GET_SEATS_FAILED:
		return {
			...state,
			seats: action.seats,
		};
	case SET_SELECTED_SEAT:
		return {
			...state,
			selectedSeat: action.seat,
		};
	case GET_MY_SEAT_SUCCESS:
		return {
			...state,
			mySeat: action.seat,
		};
	case GET_SEATS_FAILED:
		return {
			...state,
			seat: null,
		};
	default: return state;
	}
};

export default seats;
