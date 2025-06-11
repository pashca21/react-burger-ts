import {
	WS_CONNECTION_SUCCESS,
	WS_CONNECTION_ERROR,
	WS_CONNECTION_CLOSED,
	WS_GET_MESSAGE_ORDERS_ALL,
	WS_GET_MESSAGE_ORDERS_USER,
} from '@services/actions/websocket';
import { websocketInitialState, websocketReducer } from './websocket';
import type { IOrders, TWSActions } from '@utils/types';

describe('WebSocket Reducer', () => {
	it('should return the initial state', () => {
		expect(websocketReducer(undefined, {} as TWSActions)).toEqual(websocketInitialState);
	});

	it('should handle WS_CONNECTION_SUCCESS', () => {
		const action = { type: WS_CONNECTION_SUCCESS };
		const expectedState = {
			...websocketInitialState,
			wsConnected: true,
			error: undefined,
		};
		expect(websocketReducer(websocketInitialState, action)).toEqual(expectedState);
	});

	it('should handle WS_CONNECTION_ERROR', () => {
		const error = new Event('error');
		const action = { type: WS_CONNECTION_ERROR, payload: error };
		const expectedState = {
			...websocketInitialState,
			wsConnected: false,
			error,
		};
		expect(websocketReducer(websocketInitialState, action)).toEqual(expectedState);
	});

	it('should handle WS_CONNECTION_CLOSED', () => {
		const action = { type: WS_CONNECTION_CLOSED };
		const expectedState = {
			...websocketInitialState,
			wsConnected: false,
			error: undefined,
		};
		expect(websocketReducer(websocketInitialState, action)).toEqual(expectedState);
	});

	it('should handle WS_GET_MESSAGE_ORDERS_ALL', () => {
		const ordersAll: IOrders = { orders: [], total: 0, totalToday: 0 };
		const action = { type: WS_GET_MESSAGE_ORDERS_ALL, payload: ordersAll };
		const expectedState = {
			...websocketInitialState,
			wsConnected: false,
			error: undefined,
			ordersAll,
		};
		expect(websocketReducer(websocketInitialState, action)).toEqual(expectedState);
	});

	it('should handle WS_GET_MESSAGE_ORDERS_USER', () => {
		const ordersUser: IOrders = { orders: [], total: 0, totalToday: 0 };
		const action = { type: WS_GET_MESSAGE_ORDERS_USER, payload: ordersUser };
		const expectedState = {
			...websocketInitialState,
			wsConnected: false,
			error: undefined,
			ordersUser,
		};
		expect(websocketReducer(websocketInitialState, action)).toEqual(expectedState);
	});

});
