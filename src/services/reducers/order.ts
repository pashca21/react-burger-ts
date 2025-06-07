import {
	CLEAR_ORDER,
	CREATE_ORDER_SUCCESS,
	VIEW_ORDER,
	TOrderActions,
} from '@services/actions/order';

interface IOrderState {
	name: string;
	number: number;
	order?: string;
}

const orderInitialState: IOrderState = {
	name: '',
	number: 0,
};

export const orderReducer = (
	state: IOrderState = orderInitialState,
	action: TOrderActions
) => {
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
