import {
	LOGIN_SUCCESS,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	UPDATE_ACCESS_TOKEN_SUCCESS,
	UPDATE_USER_SUCCESS,
} from '@services/actions/auth';

const initialState = {
	isAuthChecked: false,
	isAuth: false,
	isLoading: false,
	error: false,
	user: {
		name: '',
		email: '',
		password: '',
	},
	accessToken: '',
};

export const authReducer = (
	state = initialState,
	action: {
		type: string;
		error?: string;
		isAuthChecked?: boolean;
		isAuth?: boolean;
		isLoading?: boolean;
		user?: {
			name: string;
			email: string;
			password: string;
		};
		accessToken?: string;
	}
) => {
	switch (action.type) {
		case REGISTER_SUCCESS: {
			return {
				...state,
				isAuth: true,
				isLoading: false,
				error: false,
				user: action.user,
				accessToken: action.accessToken,
			};
		}
		case UPDATE_USER_SUCCESS: {
			return {
				...state,
				user: action.user,
			};
		}
		case UPDATE_ACCESS_TOKEN_SUCCESS: {
			return {
				...state,
				accessToken: action.accessToken,
			};
		}
		case LOGIN_SUCCESS: {
			return {
				...state,
				isAuth: true,
				isLoading: false,
				error: false,
				user: action.user,
				accessToken: action.accessToken,
			};
		}
		case LOGOUT_SUCCESS: {
			return {
				...state,
				isAuth: false,
				isLoading: false,
				error: false,
				user: initialState.user,
				accessToken: '',
			};
		}
		default:
			return state;
	}
};
