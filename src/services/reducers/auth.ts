import {
	GET_USER_REQUEST,
	GET_USER_SUCCESS,
	GET_USER_FAILED,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	LOGOUT_REQUEST,
	LOGOUT_SUCCESS,
	LOGOUT_FAILED,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAILED,
	UPDATE_ACCESS_TOKEN_REQUEST,
	UPDATE_ACCESS_TOKEN_SUCCESS,
	UPDATE_ACCESS_TOKEN_FAILED,
	UPDATE_USER_REQUEST,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_FAILED,
	TAuthActions,
} from '@services/actions/auth';
import { decodeTokenAndGetExp } from '@utils/functions';

export type TAuthState = {
	isAuthChecked: boolean;
	isAuth: boolean;
	isLoading: boolean;
	error: boolean | string;
	user: {
		name: string;
		email: string;
		password: string;
	};
	accessToken: string;
	accessTokenExpiresAt: number;
};

export const authInitialState: TAuthState = {
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
	accessTokenExpiresAt: 0,
};

export const authReducer = (
	state: TAuthState = authInitialState,
	action: TAuthActions
): TAuthState => {
	switch (action.type) {
		case REGISTER_REQUEST: {
			return {
				...state,
				isAuthChecked: true,
				isAuth: false,
				isLoading: true,
				error: false,
			};
		}
		case REGISTER_SUCCESS: {
			return {
				...state,
				isAuth: true,
				isLoading: false,
				error: false,
				user: action.user,
				accessToken: action.accessToken,
				accessTokenExpiresAt: decodeTokenAndGetExp(action.accessToken) || 0,
			};
		}
		case REGISTER_FAILED: {
			return {
				...state,
				isAuth: false,
				isLoading: false,
				error: false,
			};
		}
		case GET_USER_REQUEST: {
			return {
				...state,
				isAuthChecked: true,
				isAuth: false,
				isLoading: true,
				error: false,
			};
		}
		case GET_USER_SUCCESS: {
			return {
				...state,
				isAuth: true,
				isLoading: false,
				error: false,
				user: action.user,
			};
		}
		case GET_USER_FAILED: {
			return {
				...state,
				isAuth: false,
				isLoading: false,
				error: false,
			};
		}
		case UPDATE_USER_REQUEST: {
			return {
				...state,
				isAuthChecked: true,
				isAuth: false,
				isLoading: true,
				error: false,
			};
		}
		case UPDATE_USER_SUCCESS: {
			return {
				...state,
				user: action.user,
			};
		}
		case UPDATE_USER_FAILED: {
			return {
				...state,
				isAuth: false,
				isLoading: false,
				error: false,
			};
		}
		case UPDATE_ACCESS_TOKEN_REQUEST: {
			return {
				...state,
				isAuthChecked: true,
				isAuth: false,
				isLoading: true,
				error: false,
			};
		}
		case UPDATE_ACCESS_TOKEN_SUCCESS: {
			return {
				...state,
				accessToken: action.accessToken,
				accessTokenExpiresAt: decodeTokenAndGetExp(action.accessToken) || 0,
			};
		}
		case UPDATE_ACCESS_TOKEN_FAILED: {
			return {
				...state,
				accessToken: '',
				accessTokenExpiresAt: 0,
			};
		}
		case LOGIN_REQUEST: {
			return {
				...state,
				isAuthChecked: true,
				isAuth: false,
				isLoading: true,
				error: false,
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
				accessTokenExpiresAt: decodeTokenAndGetExp(action.accessToken) || 0,
			};
		}
		case LOGOUT_FAILED: {
			return {
				...state,
				isAuth: false,
				isLoading: false,
				error: true,
				user: authInitialState.user,
				accessToken: '',
				accessTokenExpiresAt: 0,
			};
		}
		case LOGOUT_REQUEST: {
			return {
				...state,
				isAuthChecked: true,
				isAuth: false,
				isLoading: true,
				error: false,
			};
		}
		case LOGOUT_SUCCESS: {
			return {
				...state,
				isAuth: false,
				isLoading: false,
				error: false,
				user: authInitialState.user,
				accessToken: '',
				accessTokenExpiresAt: 0,
			};
		}
		case LOGIN_FAILED: {
			return {
				...state,
				isAuth: false,
				isLoading: false,
				error: false,
			};
		}
		default:
			return state;
	}
};
