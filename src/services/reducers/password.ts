import {
	FORGOT_PASSWORD_SUCCESS,
	RESET_PASSWORD_SUCCESS,
} from '@services/actions/password';

const initialState = {
	isSent: false,
};

export const passwordReducer = (
	state = initialState,
	action: {
		type: string;
	}
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
