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
import { authReducer, authInitialState } from './auth';
import { decodeTokenAndGetExp } from '@utils/functions';

describe('auth reducer', () => {
	const user = {
		name: 'John Doe',
		email: 'test@email.com',
		password: 'password123',
	};

	it('should return the initial state', () => {
		expect(authReducer(undefined, {} as TAuthActions)).toEqual(
			authInitialState
		);
	});

	it('should handle GET_USER_REQUEST', () => {
		expect(
			authReducer(authInitialState, {
				type: GET_USER_REQUEST,
			})
		).toEqual({
			...authInitialState,
			isAuthChecked: true,
			isAuth: false,
			isLoading: true,
			error: false,
		});
	});

	it('should handle GET_USER_SUCCESS', () => {
		expect(
			authReducer(authInitialState, {
				type: GET_USER_SUCCESS,
				user,
			})
		).toEqual({
			...authInitialState,
			isAuthChecked: false,
			isAuth: true,
			isLoading: false,
			error: false,
			user,
		});
	});

	it('should handle GET_USER_FAILED', () => {
		const error = 'Failed to get user';
		expect(
			authReducer(authInitialState, {
				type: GET_USER_FAILED,
				message: error,
			})
		).toEqual({
			...authInitialState,
			isAuthChecked: false,
			isAuth: false,
			isLoading: false,
			error: false,
		});
	});

	it('should handle LOGIN_REQUEST', () => {
		expect(
			authReducer(authInitialState, {
				type: LOGIN_REQUEST,
			})
		).toEqual({
			...authInitialState,
			isAuthChecked: true,
			isAuth: false,
			isLoading: true,
			error: false,
		});
	});

	it('should handle LOGIN_SUCCESS', () => {
		expect(
			authReducer(authInitialState, {
				type: LOGIN_SUCCESS,
				user,
				accessToken: '',
			})
		).toEqual({
			...authInitialState,
			isAuthChecked: false,
			isAuth: true,
			isLoading: false,
			error: false,
			user,
		});
	});

	it('should handle LOGIN_FAILED', () => {
		const error = 'Login failed';
		expect(
			authReducer(authInitialState, {
				type: LOGIN_FAILED,
				message: error,
			})
		).toEqual({
			...authInitialState,
			isAuthChecked: false,
			isAuth: false,
			isLoading: false,
			error: false,
		});
	});

	it('should handle LOGOUT_REQUEST', () => {
		expect(
			authReducer(authInitialState, {
				type: LOGOUT_REQUEST,
			})
		).toEqual({
			...authInitialState,
			isAuthChecked: true,
			isAuth: false,
			isLoading: true,
			error: false,
		});
	});

	it('should handle LOGOUT_SUCCESS', () => {
		expect(
			authReducer(authInitialState, {
				type: LOGOUT_SUCCESS,
			})
		).toEqual({
			...authInitialState,
			isAuth: false,
			isLoading: false,
			error: false,
			user: authInitialState.user,
			accessToken: '',
			accessTokenExpiresAt: 0,
		});
	});

	it('should handle LOGOUT_FAILED', () => {
		const error = 'Logout failed';
		expect(
			authReducer(authInitialState, {
				type: LOGOUT_FAILED,
				message: error,
			})
		).toEqual({
			...authInitialState,
			isAuth: false,
			isLoading: false,
			error: true,
			user: authInitialState.user,
			accessToken: '',
			accessTokenExpiresAt: 0,
		});
	});

	it('should handle REGISTER_REQUEST', () => {
		expect(
			authReducer(authInitialState, {
				type: REGISTER_REQUEST,
			})
		).toEqual({
			...authInitialState,
			isAuthChecked: true,
			isAuth: false,
			isLoading: true,
			error: false,
		});
	});

	it('should handle REGISTER_SUCCESS', () => {
		expect(
			authReducer(authInitialState, {
				type: REGISTER_SUCCESS,
				user,
				accessToken: '',
			})
		).toEqual({
			...authInitialState,
			isAuthChecked: false,
			isAuth: true,
			isLoading: false,
			error: false,
			user,
			accessToken: '',
			accessTokenExpiresAt: decodeTokenAndGetExp('') || 0,
		});
	});

	it('should handle REGISTER_FAILED', () => {
		const error = 'Registration failed';
		expect(
			authReducer(authInitialState, {
				type: REGISTER_FAILED,
				message: error,
			})
		).toEqual({
			...authInitialState,
			isAuthChecked: false,
			isAuth: false,
			isLoading: false,
			error: false,
		});
	});

	it('should handle UPDATE_ACCESS_TOKEN_REQUEST', () => {
		expect(
			authReducer(authInitialState, {
				type: UPDATE_ACCESS_TOKEN_REQUEST,
			})
		).toEqual({
			...authInitialState,
			isAuthChecked: true,
			isAuth: false,
			isLoading: true,
			error: false,
		});
	});

	it('should handle UPDATE_ACCESS_TOKEN_SUCCESS', () => {
		const accessToken = 'newAccessToken';
		expect(
			authReducer(authInitialState, {
				type: UPDATE_ACCESS_TOKEN_SUCCESS,
				accessToken,
			})
		).toEqual({
			...authInitialState,
			accessToken,
			accessTokenExpiresAt: decodeTokenAndGetExp(accessToken) || 0,
		});
	});

	it('should handle UPDATE_ACCESS_TOKEN_FAILED', () => {
		const error = 'Update access token failed';
		expect(
			authReducer(authInitialState, {
				type: UPDATE_ACCESS_TOKEN_FAILED,
				message: error,
			})
		).toEqual({
			...authInitialState,
			accessToken: '',
			accessTokenExpiresAt: 0,
		});
	});

	it('should handle UPDATE_USER_REQUEST', () => {
		expect(
			authReducer(authInitialState, {
				type: UPDATE_USER_REQUEST,
			})
		).toEqual({
			...authInitialState,
			isAuthChecked: true,
			isAuth: false,
			isLoading: true,
			error: false,
		});
	});

	it('should handle UPDATE_USER_SUCCESS', () => {
		expect(
			authReducer(authInitialState, {
				type: UPDATE_USER_SUCCESS,
				user,
			})
		).toEqual({
			...authInitialState,
			isAuth: false,
			isLoading: false,
			error: false,
			user,
		});
	});

	it('should handle UPDATE_USER_FAILED', () => {
		const error = 'Update user failed';
		expect(
			authReducer(authInitialState, {
				type: UPDATE_USER_FAILED,
				message: error,
			})
		).toEqual({
			...authInitialState,
			isAuth: false,
			isLoading: false,
			error: false,
		});
	});

});
