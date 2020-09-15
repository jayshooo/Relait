import { ISeatsInitialState } from './types';
import { SeatsActionTypes, GET_SEATS_SUCCESS, GET_SEATS_FAILED } from '../../actions/seats/types';

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