import {
	FORGOT_PASSWORD_SUCCESS,
	RESET_PASSWORD_SUCCESS,
	TPasswordActions,
} from '@services/actions/password';

export type TPasswordState = {
	isSent: boolean;
};

export const passwordInitialState: TPasswordState = {
	isSent: false,
};

export const passwordReducer = (
	state: TPasswordState = passwordInitialState,
	action: TPasswordActions
): TPasswordState => {
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
