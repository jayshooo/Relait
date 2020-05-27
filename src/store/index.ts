import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';

import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './reducers';
import watcher from './saga/saga';

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });
let middlewares: any = [ sagaMiddleware ];

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

sagaMiddleware.run(watcher);

export default store;