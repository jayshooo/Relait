import { SET_MAP_REF, UiActionTypes } from "../../actions/ui/types";
import { UiInitialState } from "./types";

const initialState = {
	alertObj: {
		visible: false,
		title: "",
		content: "",
		buttons: [],
		cancelable: false,
	},
	map: null,
};

const ui = (state: UiInitialState = initialState, action: UiActionTypes) => {
	switch (action.type) {
	case "SHOW_ALERT":
		return {
			...state,
			alertObj: {
				visible: true,
				...action.data,
			},
		};
	case "HIDE_ALERT":
		return {
			...state,
			alertObj: {
				visible: false,
				title: "",
				content: "",
				buttons: [],
				cancelable: false,
			},
		};
	case SET_MAP_REF:
		return {
			...state,
			map: action.map,
		};
	default: return state;
	}
};

export default ui;
