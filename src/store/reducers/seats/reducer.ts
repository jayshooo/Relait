import { ISeatsInitialState } from './types';
import { SeatsActionTypes } from '../../actions/seats/types';
import { GET_SEATS_SUCCESS } from '../../saga/types';

const initialState = {
    seats: null,
};

const seats = (state: ISeatsInitialState = initialState, action: SeatsActionTypes) => {
    switch (action.type) {
        case GET_SEATS_SUCCESS:
            return {
                ...state,
                seats: action.data,
            };
        default: return state;
    }
};

export default seats;