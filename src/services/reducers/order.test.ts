import {
	CREATE_ORDER_SUCCESS,
	VIEW_ORDER,
	CLEAR_ORDER,
	TOrderActions,
} from '@services/actions/order';
import { orderReducer, orderInitialState } from './order';
import { IOrder } from '@utils/types';

describe('order reducer', () => {
	it('should return the initial state', () => {
		expect(
			orderReducer(undefined, {} as TOrderActions)
		).toEqual(orderInitialState);
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

	it('should handle VIEW_ORDER', () => {
		const order: IOrder =
		{
			_id: '1',
			name: 'Test Order',
			number: 123,
			status: 'done',
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			ingredients: ['ingredient1', 'ingredient2'],
		};
		expect(
			orderReducer(orderInitialState, {
				type: VIEW_ORDER,
				number: 123,
				order: order,
			})
		).toEqual({
			...orderInitialState,
			order: order,
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
