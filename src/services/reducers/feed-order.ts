import {
	VIEW_ORDER,
	CLOSE_ORDER,
} from '@services/actions/feed-order';
import { IOrder } from '@utils/types';

const initialState = {
	order: null,
};

export const feedOrderReducer = (
	state = initialState,
	action: { type: string; order: IOrder }
) => {
	switch (action.type) {
		case VIEW_ORDER: {
			return {
				...state,
				order: action.order,
			};
		}
		case CLOSE_ORDER: {
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
