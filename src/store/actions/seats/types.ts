import { GET_SEATS_REQUEST, GET_SEATS_SUCCESS, GET_SEATS_FAILED } from '../../saga/types';
import { ISeatsInitialState } from '../../reducers/seats/types';

interface GetSeatsAction {
    type: typeof GET_SEATS_REQUEST | typeof GET_SEATS_SUCCESS | typeof GET_SEATS_FAILED;
    seats: ISeatsInitialState[ 'seats' ];
}

export type SeatsActionTypes = GetSeatsAction;