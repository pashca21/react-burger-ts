import {
	FORGOT_PASSWORD_SUCCESS,
	RESET_PASSWORD_SUCCESS,
	TPasswordActions,
} from '@services/actions/password';

export type TPasswordState = {
	isSent: boolean;
};

const passwordInitialState = {
	isSent: false,
};

export const passwordReducer = (
	state: TPasswordState = passwordInitialState,
	action: TPasswordActions
) => {
	switch (action.type) {
		case FORGOT_PASSWORD_SUCCESS: {
			return {
				...state,
				isSent: true,
			};
		}
		case RESET_PASSWORD_SUCCESS: {
			return {
				...state,
				isSent: false,
			};
		}
		default: {
			return state;
		}
	}
};
