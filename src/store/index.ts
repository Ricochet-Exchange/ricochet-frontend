import { applyMiddleware, compose, createStore } from 'redux';
import * as Sentry from '@sentry/react';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import reducers from './reducers';
import sagas from './sagas';
import { referralMiddleware } from './middleware/referral-middleware';

const sagaMiddleware = createSagaMiddleware();

const sentryReduxEnhancer = Sentry.createReduxEnhancer({
	// Optionally pass options
});
declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
		__REDUX_DEVTOOLS_EXTENSION__: typeof compose;
	}
}

const composeEnhancers =
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
	// eslint-disable-next-line no-underscore-dangle
	window.__REDUX_DEVTOOLS_EXTENSION__ ||
	compose;

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware, referralMiddleware), sentryReduxEnhancer);
export const store = createStore(reducers, enhancer);
export const persistor = persistStore(store);

sagaMiddleware.run(sagas);
