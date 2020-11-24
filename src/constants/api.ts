import Axios from "axios";
import { BASE_URL } from "./constants";

export const httpClient = () => {

	return Axios.create({
		baseURL: BASE_URL,
	});

};

export const setAuthorizationHeader = async (token: string) => {
	Axios.defaults.headers.common.Authorization = token;
};
