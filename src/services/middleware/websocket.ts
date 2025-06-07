import type { Middleware, MiddlewareAPI } from 'redux';
import type { IOrders, TWSStoreActions } from '@utils/types';

export const websocketMiddleware = (wsActions: TWSStoreActions): Middleware => {
	return (store: MiddlewareAPI) => {
		let socket: WebSocket | null = null;
		let url: string | null = null;

		return (next) => (action: any) => {
			const { dispatch } = store;
			const { type } = action;
			const {
				wsInit,
				onOpen,
				onClose,
				onError,
				onMessageOrdersAll,
				onMessageOrdersUser,
			} = wsActions;

			if (type === wsInit && action.payload) {
				socket = new WebSocket(action.payload);
				url = action.payload;
			}

			if (socket) {
				socket.onopen = (event) => {
					dispatch({ type: onOpen, payload: event });
				};

				socket.onerror = (event) => {
					dispatch({ type: onError, payload: event });
				};

				socket.onmessage = (event) => {
					const { data } = event;
					const parsedData: IOrders = JSON.parse(data);

					dispatch({
						type:
							url && url.includes('/all')
								? onMessageOrdersAll
								: onMessageOrdersUser,
						payload: { ...parsedData },
					});
				};

				socket.onclose = (event) => {
					dispatch({ type: onClose, payload: event });
				};
			}

			next(action);
		};
	};
};
