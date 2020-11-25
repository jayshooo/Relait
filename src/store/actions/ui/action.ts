import { SHOW_ALERT, HIDE_ALERT, AlertContentInterface, SET_MAP_REF, SetMapRefInterface } from "./types";

export const showAlert = (data: AlertContentInterface) => ({
	type: SHOW_ALERT,
	data,
});

export const hideAlert = () => ({
	type: HIDE_ALERT,
});

export const setMapRef = (map: SetMapRefInterface["map"]) => ({
	type: SET_MAP_REF,
	map,
});
