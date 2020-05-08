import { combineReducers } from 'redux';
import ui from './ui/reducer';

export const rootReducer = combineReducers({
    ui,
});

export type RootState = ReturnType<typeof rootReducer>;