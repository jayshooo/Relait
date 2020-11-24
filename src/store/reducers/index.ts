import { combineReducers } from "redux";
import ui from "./ui/reducer";
import myInfo from "./myInfo/reducer";
import seats from "./seats/reducer";

export const rootReducer = combineReducers({
	ui,
	myInfo,
	seats,
});

export type RootState = ReturnType<typeof rootReducer>;
