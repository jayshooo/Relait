import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });
let middlewares: any = [ thunk ];

if (__DEV__) {
    middlewares = [
        ...middlewares,
        loggerMiddleware,
    ];
}

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(...middlewares),
    )
);

export default store;