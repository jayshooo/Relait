import axios from 'axios';
import { BASE_URL, ASYNC_STORAGE_API_TOKEN } from './constants';
import AsyncStorage from '@react-native-community/async-storage';

export const httpClient = () => {

    return axios.create({
        baseURL: BASE_URL,
    });

};

const setAuthorizationHeader = async () => {
    const result = await AsyncStorage.getItem(ASYNC_STORAGE_API_TOKEN);
    axios.defaults.headers.common[ 'Authorization' ] = result;
};

setAuthorizationHeader();
