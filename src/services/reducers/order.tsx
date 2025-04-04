import { CREATE_ORDER_SUCCESS, VIEW_ORDER } from '@services/actions/order';

const initialState = {
	name: '',
	number: 0,
};

export const orderReducer = (
	state = initialState,
	action: {
		number: number;
		name: string;
		type: string;
		order: string;
	}
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
		default: {
			return state;
		}
	}
};
