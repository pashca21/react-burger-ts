import {
	VIEW_FEED_ORDER,
	CLOSE_FEED_ORDER,
	TFeedOrderActions
} from '@services/actions/feed-order';
import { feedOrderReducer, feedOrderInitialState } from './feed-order';
import { IOrder } from '@utils/types';

describe('feed order reducer', () => {
	it('should return the initial state', () => {
		expect(
			feedOrderReducer(undefined, {} as TFeedOrderActions)
		).toEqual(feedOrderInitialState);
	});

	it('should handle VIEW_FEED_ORDER', () => {
		const order: IOrder = {
			_id: '1',
			name: 'Test Order',
			status: 'done',
			number: 123,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			ingredients: ['ingredient1', 'ingredient2'],
		};
		const initialState = {
			order: null,
		};
		expect(
			feedOrderReducer(initialState, {
				type: VIEW_FEED_ORDER,
				order,
			})
		).toEqual({
			...initialState,
			order,
		});
	});

	it('should handle CLOSE_FEED_ORDER', () => {
		const state = {
			order: {
				_id: '1',
				name: 'Test Order',
				status: 'done',
				number: 123,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				ingredients: [],
				price: 0,
				user: { name: 'Test User' },
			},
		};
		expect(
			feedOrderReducer(state, {
				type: CLOSE_FEED_ORDER,
			})
		).toEqual({
			order: null,
		});
	});
});
