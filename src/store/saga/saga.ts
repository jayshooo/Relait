import { call, put, takeLatest } from 'redux-saga/effects';
import { LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_FAILED, GET_SEATS_REQUEST, LoginSagaAction } from './types';
import { httpClient } from '../../constants/api';

const loginAPI = (uniqueId: string) => {
    return httpClient().post('/user/login', {
        uniqueId,
    });
};

const getSeatsAPI = () => {
    return httpClient().get('/seat');
};

const fetchLogin = function* (action: LoginSagaAction) {
    try {
        yield call(loginAPI, action.data);

        yield put({
            type: LOGIN_SUCCESS,
            data: true,
        });
    }
    catch (e) {
        yield put({
            type: LOGIN_FAILED,
            data: false,
        });
    }
};

const getSeats = function* () {
    try {
        // const result = yield call(getSeatsAPI);
    }
    catch (e) {

    }
};

const watcher = function* () {
    yield takeLatest(LOGIN_REQUEST, fetchLogin);
    yield takeLatest(GET_SEATS_REQUEST, getSeats);
};

export default watcher;