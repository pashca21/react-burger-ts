// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@components/app';
import './styles.css';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';
import { rootReducer } from '@services/reducers';
import { websocketMiddleware } from '@services/middleware/websocket';
import {
	WS_CONNECTION_START,
	WS_CONNECTION_SUCCESS,
	WS_CONNECTION_CLOSED,
	WS_CONNECTION_ERROR,
	WS_GET_MESSAGE_ORDERS_ALL,
	WS_GET_MESSAGE_ORDERS_USER,
} from '@services/actions/websocket';
import type { TWSStoreActions } from '@utils/types';

const composeEnhancers =
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose;

const wsActions: TWSStoreActions = {
	wsInit: WS_CONNECTION_START,
	onOpen: WS_CONNECTION_SUCCESS,
	onClose: WS_CONNECTION_CLOSED,
	onError: WS_CONNECTION_ERROR,
	onMessageOrdersAll: WS_GET_MESSAGE_ORDERS_ALL,
	onMessageOrdersUser: WS_GET_MESSAGE_ORDERS_USER,
};

const enhancer = composeEnhancers(
	applyMiddleware(thunk, websocketMiddleware(wsActions))
);

const store = createStore(rootReducer, enhancer);

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
root.render(
	// <StrictMode>
	<Provider store={store}>
		<App />
	</Provider>
	// </StrictMode>
);
