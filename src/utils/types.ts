import { ReactNode } from 'react';
import { ThunkAction } from 'redux-thunk';
import {
	WS_CONNECTION_START,
	WS_CONNECTION_SUCCESS,
	WS_CONNECTION_ERROR,
	WS_CONNECTION_CLOSED,
	WS_GET_MESSAGE_ORDERS_ALL,
	WS_GET_MESSAGE_ORDERS_USER,
} from '@services/actions/websocket';
import { rootReducer } from '@services/reducers';
import { TIngredientsActions } from '@services/actions/ingredients';
import { TAuthActions } from '@services/actions/auth';
import { TConstructorActions } from '@services/actions/constructor';
import { TFeedOrderActions } from '@services/actions/feed-order';
import { TIngredientActions } from '@services/actions/ingredient';
import { TOrderActions } from '@services/actions/order';
import { TPasswordActions } from '@services/actions/password';
import { store } from '../index';

export type TRootState = ReturnType<typeof rootReducer>;

export interface IIngredient {
	uniqueId?: string;
	_id: string | undefined;
	name: string;
	type: string;
	image: string;
	image_mobile: string;
	image_large: string;
	price: number;
	calories: number;
	proteins: number;
	fat: number;
	carbohydrates: number;
	__v: number;
}

export interface IModal {
	onClose: () => void;
	children: ReactNode;
	title: string;
}

export interface IModalOverlay {
	onClose: () => void;
	children: ReactNode;
}

export interface IOrders {
	success?: boolean;
	orders: IOrder[];
	total: number;
	totalToday: number;
}

export interface IOrder {
	_id: string;
	name: string;
	status: string;
	number: number;
	createdAt: string;
	updatedAt: string;
	ingredients: string[];
}

export interface IWSConnectionStart {
	readonly type: typeof WS_CONNECTION_START;
	payload: string;
}

export interface IWSConnectionSuccess {
	readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWSConnectionError {
	readonly type: typeof WS_CONNECTION_ERROR;
	payload: Event;
}

export interface IWSConnectionClosed {
	readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWSGetMessageOrdersAll {
	readonly type: typeof WS_GET_MESSAGE_ORDERS_ALL;
	payload: IOrders;
}

export interface IWSGetMessageOrdersUser {
	readonly type: typeof WS_GET_MESSAGE_ORDERS_USER;
	payload: IOrders;
}

export type TWSActions =
	| IWSConnectionStart
	| IWSConnectionSuccess
	| IWSConnectionError
	| IWSConnectionClosed
	| IWSGetMessageOrdersAll
	| IWSGetMessageOrdersUser;

export type TWSStoreActions = {
	wsInit: typeof WS_CONNECTION_START;
	onOpen: typeof WS_CONNECTION_SUCCESS;
	onClose: typeof WS_CONNECTION_CLOSED;
	onError: typeof WS_CONNECTION_ERROR;
	onMessageOrdersAll: typeof WS_GET_MESSAGE_ORDERS_ALL;
	onMessageOrdersUser: typeof WS_GET_MESSAGE_ORDERS_USER;
};

export type TApplicationActions =
	| TWSActions
	| TAuthActions
	| TConstructorActions
	| TFeedOrderActions
	| TIngredientActions
	| TIngredientsActions
	| TOrderActions
	| TPasswordActions;

export type TAppDispatch = typeof store.dispatch;

export type TAppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	TRootState,
	unknown,
	TApplicationActions
>;
