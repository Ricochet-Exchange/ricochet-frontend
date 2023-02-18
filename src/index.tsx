import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from 'containers/app/App';
import 'i18n';
import history from 'utils/history';
import reportWebVitals from './reportWebVitals';
import { store, persistor } from './store';
import 'assets/styles/main.scss';
import 'assets/styles/loading.scss';
import { LoadingProvider } from 'context';

Sentry.init({
	dsn: process.env.REACT_APP_SENTRY_DSN,
	integrations: [
		new BrowserTracing({
			routingInstrumentation: Sentry.reactRouterV5Instrumentation(history),
		}),
	],
	tracesSampleRate: process.env.REACT_APP_SENTRY_ENVIRONMENT === 'development' ? 1.0 : 0.8,
	normalizeDepth: 10,
	environment: process.env.REACT_APP_SENTRY_ENVIRONMENT,
});

const client = new ApolloClient({
	uri: `${(process.env.REACT_APP_API_GRATH || '').replace('/superfluid-matic', '')}/protocol-v1-matic`,
	cache: new InMemoryCache(),
});

if (window.location.protocol === 'http:' && !window.location.href.includes('http://localhost:3000/')) {
	window.location.href = window.location.href.replace('http:', 'https:');
}

const root = document.getElementById('root');

ReactDOM.render(
	<ApolloProvider client={client}>
		<CookiesProvider>
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<PersistGate loading={null} persistor={persistor}>
						<LoadingProvider>
							<App />
						</LoadingProvider>
					</PersistGate>
				</ConnectedRouter>
			</Provider>
		</CookiesProvider>
	</ApolloProvider>,
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
