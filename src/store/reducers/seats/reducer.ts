import { ISeatsInitialState } from './types';
import { SeatsActionTypes } from '../../actions/seats/types';
import { GET_SEATS_SUCCESS, GET_SEATS_FAILED } from '../../saga/types';

const initialState = {
    seats: [],
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
        default: return state;
    }
};

export default seats;