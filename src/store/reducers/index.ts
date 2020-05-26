import { combineReducers } from 'redux';
import ui from './ui/reducer';
import myInfo from './myInfo/reducer';

export const rootReducer = combineReducers({
    ui,
    myInfo,
});

export type RootState = ReturnType<typeof rootReducer>;