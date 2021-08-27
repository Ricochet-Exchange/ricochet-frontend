import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import reducers from './reducers';
import sagas from './sagas';
import { mainCheck, mainGetData } from './main/actionCreators';

const sagaMiddleware = createSagaMiddleware();

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
    __REDUX_DEVTOOLS_EXTENSION__: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  // eslint-disable-next-line no-underscore-dangle
  || window.__REDUX_DEVTOOLS_EXTENSION__
  || compose;

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware),
);
export const store = createStore(reducers, enhancer);
export const persistor = persistStore(store);

sagaMiddleware.run(sagas);

(window as any).ethereum?.on(
  'chainChanged',
  () => store.dispatch(mainCheck()),
);

(window as any).ethereum?.on(
  'accountsChanged',
  () => store.dispatch(mainGetData()),
);
