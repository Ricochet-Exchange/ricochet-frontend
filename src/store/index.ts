import { applyMiddleware, createStore, Store } from 'redux';
import { createWrapper, Context } from 'next-redux-wrapper';
import createSagaMiddleware, { Task } from 'redux-saga';
import { persistStore } from 'redux-persist';
import reducers from './reducers';
import sagas from './sagas';
import { mainCheck, mainGetData } from './main/actionCreators';
import { referralMiddleware } from './middleware/referral-middleware';
import { composeWithDevTools } from '@redux-devtools/extension';
import type { State } from 'types/store';

export interface SagaStore extends Store {
  sagaTask?: Task;
}

export const makeStore = (ctx: Context) => {
  // 1: Create the middleware
  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancers = composeWithDevTools({
    // Specify here name, actionsDenylist, actionsCreators and other options
  });

  const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware, referralMiddleware)
  );
  // 2: Add an extra parameter for applying middleware:
  const store = createStore(reducers, enhancer);

  // 3: Run your sagas on server
  (store as SagaStore).sagaTask = sagaMiddleware.run(sagas);

  // Listen to client wallet change
  if (typeof window !== 'undefined' && !!(window as any).entherum) {
    (window as any).entherum?.on('chainChanged', () =>
      store.dispatch(mainCheck())
    );

    (window as any).entherum?.on('accountsChanged', () =>
      store.dispatch(mainCheck())
    );
  }

  // 4: now return the store:
  return store;
};

export const wrapper = createWrapper<Store<State>>(makeStore, { debug: true });
