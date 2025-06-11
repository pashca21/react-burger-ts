import {
	CREATE_ORDER_SUCCESS,
	VIEW_ORDER,
	CLEAR_ORDER,
	TOrderActions,
} from '@services/actions/order';
import { IOrder } from '@utils/types';

export type TOrderState = {
	name: string;
	number: number;
	order?: IOrder;
}

export const orderInitialState: TOrderState = {
	name: '',
	number: 0,
};

export const orderReducer = (
	state: TOrderState = orderInitialState,
	action: TOrderActions
): TOrderState => {
	switch (action.type) {
		case VIEW_ORDER: {
			return {
				...state,
				order: action.order,
			};
		}
		case CREATE_ORDER_SUCCESS: {
			return {
				...state,
				name: action.name,
				number: action.number,
			};
		}
		case CLEAR_ORDER: {
			return {
				...state,
				name: '',
				number: 0,
			};
		}
		default: {
			return state;
		}
	}
};
