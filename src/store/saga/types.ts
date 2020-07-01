export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const GET_SEATS_REQUEST = 'GET_SEATS_REQUEST';
export const GET_SEATS_SUCCESS = 'GET_SEATS_SUCCESS';
export const GET_SEATS_FAILED = 'GET_SEATS_FAILED';

export interface LoginSagaAction {
    type: typeof LOGIN_REQUEST | typeof LOGIN_SUCCESS | typeof LOGIN_FAILED;
    data: string;
}
