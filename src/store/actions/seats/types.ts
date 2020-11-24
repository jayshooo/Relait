import { ISeat, ISeatsInitialState } from "../../reducers/seats/types";

export const GET_SEATS_REQUEST = "GET_SEATS_REQUEST";
export const GET_SEATS_SUCCESS = "GET_SEATS_SUCCESS";
export const GET_SEATS_FAILED = "GET_SEATS_FAILED";
export const SET_SELECTED_SEAT = "SET_SELECTED_SEAT";

interface GetSeatsAction {
    type: typeof GET_SEATS_REQUEST | typeof GET_SEATS_SUCCESS | typeof GET_SEATS_FAILED;
    seats: ISeatsInitialState[ "seats" ];
}

interface SetSelectedSeatAction {
    type: typeof SET_SELECTED_SEAT;
    seat: ISeat | null;
}

export type SeatsActionTypes = GetSeatsAction | SetSelectedSeatAction;
