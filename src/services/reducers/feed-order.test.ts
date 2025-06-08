import { feedOrderReducer } from './feed-order';
import { VIEW_FEED_ORDER, CLOSE_FEED_ORDER } from '@services/actions/feed-order';
import type { IOrder } from '@utils/types';
import type { TFeedOrderState } from './feed-order';

describe('feed order reducer', () => {
	const initialState: TFeedOrderState = {
		order: null,
	};

	it('should return the initial state', () => {
		expect(feedOrderReducer(undefined, {} as any)).toEqual(initialState);
	});

	it('should handle VIEW_FEED_ORDER', () => {
		const order: IOrder = {
			_id: '1',
			name: 'Test Order',
			status: 'done',
			number: 123,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			ingredients: [],
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
