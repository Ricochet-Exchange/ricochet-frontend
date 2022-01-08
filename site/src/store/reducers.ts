import { combineReducers } from 'redux';
import { PersistConfig, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { connectRouter } from 'connected-react-router';
import main from 'store/main';
import modal from 'store/modal';
import banks from 'store/banks';
import history from 'utils/history';

const PERSIST_CONFIGS: Record<string, PersistConfig<any>> = {
  main: {
    storage,
    key: 'main',
    whitelist: ['main'],
  },
}; 

export default combineReducers({
  main: persistReducer(PERSIST_CONFIGS.main, main),
  modal,
  banks,
  router: connectRouter(history),
});
