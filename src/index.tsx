import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from 'containers/app/App';
import reportWebVitals from './reportWebVitals';
import { store, persistor } from './store';
import 'assets/styles/main.scss';

const root = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  root,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// disable CRA warnings on production
if (process.env.NODE_ENV !== 'development') {
  // eslint-disable-next-line no-console
  console.warn = () => {};
}
