import { call, put, takeLatest } from 'redux-saga/effects';
import { LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_FAILED, SagaActionTypes } from './types';
import { httpClient } from '../../constants/api';

const loginAPI = (uniqueId: string) => {
    return httpClient.post('/user/login', {
        uniqueId,
    });
};

const fetchLogin = function* (action: SagaActionTypes) {
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
        throw new Error(e);
    }
};

const watcher = function* () {
    yield takeLatest(LOGIN_REQUEST, fetchLogin);
};

export default watcher;