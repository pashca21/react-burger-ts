import {
	VIEW_ORDER,
	CREATE_ORDER_SUCCESS,
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_FAILED,
	CLEAR_ORDER,
} from '@services/actions/order';
import { orderReducer, orderInitialState } from './order';
import { TOrderActions } from '@services/actions/order';

describe('order reducer', () => {
	it('should return the initial state', () => {
		expect(orderReducer(undefined, {} as TOrderActions)).toEqual(orderInitialState);
	});

	it('should handle VIEW_ORDER', () => {
		const order = { number: 123, name: 'Test Order' };
		expect(
			orderReducer(orderInitialState, {
				type: VIEW_ORDER,
				number: 123,
				order,
			})
		).toEqual({
			...orderInitialState,
			order,
		});
	});

	it('should handle CREATE_ORDER_SUCCESS', () => {
		expect(
			orderReducer(orderInitialState, {
				type: CREATE_ORDER_SUCCESS,
				name: 'Test Order',
				number: 123,
			})
		).toEqual({
			...orderInitialState,
			name: 'Test Order',
			number: 123,
		});
	});

	it('should handle CREATE_ORDER_REQUEST', () => {
		expect(
			orderReducer(orderInitialState, {
				type: CREATE_ORDER_REQUEST,
			})
		).toEqual({
			...orderInitialState,
			name: '',
			number: 0,
		});
	});

	it('should handle CREATE_ORDER_FAILED', () => {
		expect(
			orderReducer(orderInitialState, {
				type: CREATE_ORDER_FAILED,
				message: 'Error message',
			})
		).toEqual({
			...orderInitialState,
			name: '',
			number: 0,
			error: 'Error message',
		});
	});

	it('should handle CLEAR_ORDER', () => {
		expect(
			orderReducer({ name: 'Test Order', number: 123 }, {
				type: CLEAR_ORDER,
			})
		).toEqual(orderInitialState);
	});
});
