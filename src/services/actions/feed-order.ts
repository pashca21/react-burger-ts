import { IOrder } from '@utils/types';

export const VIEW_FEED_ORDER = 'VIEW_FEED_ORDER' as const;
export const CLOSE_FEED_ORDER = 'CLOSE_FEED_ORDER' as const;

export interface IViewFeedOrderActin {
	readonly type: typeof VIEW_FEED_ORDER;
	readonly order: IOrder;
}

export interface ICloseFeedOrderAction {
	readonly type: typeof CLOSE_FEED_ORDER;
}

export type TFeedOrderActions = IViewFeedOrderActin | ICloseFeedOrderAction;
