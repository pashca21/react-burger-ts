import {
	WS_CONNECTION_SUCCESS,
	WS_CONNECTION_ERROR,
	WS_CONNECTION_CLOSED,
	WS_GET_MESSAGE_ORDERS_ALL,
	WS_GET_MESSAGE_ORDERS_USER,
} from '@services/actions/websocket';
import type { IOrders, TWSActions } from '@utils/types';

type TWSState = {
	wsConnected: boolean;
	ordersAll?: IOrders;
	ordersUser?: IOrders;
	error?: Event;
};

const initialState: TWSState = {
	wsConnected: false,
	ordersAll: undefined,
	ordersUser: undefined,
	error: undefined,
};

export const websocketReducer = (
	state: TWSState = initialState,
	action: TWSActions
) => {
	switch (action.type) {
		case WS_CONNECTION_SUCCESS:
			return {
				...state,
				error: undefined,
				wsConnected: true,
			};

		case WS_CONNECTION_ERROR:
			return {
				...state,
				error: action.payload,
				wsConnected: false,
			};

		case WS_CONNECTION_CLOSED:
			return {
				...state,
				error: undefined,
				wsConnected: false,
			};

		case WS_GET_MESSAGE_ORDERS_ALL:
			return {
				...state,
				error: undefined,
				ordersAll: action.payload,
			};

		case WS_GET_MESSAGE_ORDERS_USER:
			return {
				...state,
				error: undefined,
				ordersUser: action.payload,
			};

		default:
			return state;
	}
};
