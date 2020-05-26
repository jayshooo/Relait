import axios from 'axios';

export const httpClient = axios.create({
    baseURL: 'http://15.165.216.17:9000',
});