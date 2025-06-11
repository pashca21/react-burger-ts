import {
	VIEW_FEED_ORDER,
	CLOSE_FEED_ORDER,
	TFeedOrderActions,
} from '@services/actions/feed-order';
import { IOrder } from '@utils/types';

export type TFeedOrderState = {
	order: IOrder | null;
};

export  const feedOrderInitialState: TFeedOrderState = {
	order: null,
};

export const feedOrderReducer = (
	state: TFeedOrderState = feedOrderInitialState,
	action: TFeedOrderActions
): TFeedOrderState => {
	switch (action.type) {
		case VIEW_FEED_ORDER: {
			return {
				...state,
				order: action.order,
			};
		}
		case CLOSE_FEED_ORDER: {
			return {
				...state,
				order: null,
			};
		}
		default: {
			return state;
		}
	}
};
