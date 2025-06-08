import {
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAILED,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAILED,
	CLEAR_FORGOT_PASSWORD,
	CLEAR_RESET_PASSWORD,
} from '@services/actions/password';
import {
	passwordReducer,
	passwordInitialState,
} from './password';
import { TPasswordActions } from '@services/actions/password';

describe('password reducer', () => {
	it('should return the initial state', () => {
		expect(passwordReducer(undefined, {} as TPasswordActions)).toEqual(
			passwordInitialState
		);
	});

	it('should handle FORGOT_PASSWORD_REQUEST', () => {
		expect(
			passwordReducer(passwordInitialState, {
				type: FORGOT_PASSWORD_REQUEST,
			})
		).toEqual({
			...passwordInitialState,
			forgotPasswordLoading: true,
		});
	});

	it('should handle FORGOT_PASSWORD_SUCCESS', () => {
		expect(
			passwordReducer(passwordInitialState, {
				type: FORGOT_PASSWORD_SUCCESS,
			})
		).toEqual({
			...passwordInitialState,
			forgotPasswordSuccess: true,
			forgotPasswordLoading: false,
		});
	});

	it('should handle FORGOT_PASSWORD_FAILED', () => {
		expect(
			passwordReducer(passwordInitialState, {
				type: FORGOT_PASSWORD_FAILED,
				message: 'Error message',
			})
		).toEqual({
			...passwordInitialState,
			forgotPasswordError: 'Error message',
			forgotPasswordLoading: false,
		});
	});

	it('should handle CLEAR_FORGOT_PASSWORD', () => {
		const state = {
			forgotPasswordSuccess: true,
			forgotPasswordLoading: false,
			forgotPasswordError: 'Error message',
			resetPasswordSuccess: false,
			resetPasswordLoading: false,
			resetPasswordError: '',
		};

		expect(
			passwordReducer(state, {
				type: CLEAR_FORGOT_PASSWORD,
			})
		).toEqual({
			forgotPasswordSuccess: false,
			forgotPasswordLoading: false,
			forgotPasswordError: '',
			resetPasswordSuccess: false,
			resetPasswordLoading: false,
			resetPasswordError: '',
		});
	});

	it('should handle RESET_PASSWORD_REQUEST', () => {
		expect(
			passwordReducer(passwordInitialState, {
				type: RESET_PASSWORD_REQUEST,
			})
		).toEqual({
			...passwordInitialState,
			resetPasswordLoading: true,
		});
	});

	it('should handle RESET_PASSWORD_SUCCESS', () => {
		expect(
			passwordReducer(passwordInitialState, {
				type: RESET_PASSWORD_SUCCESS,
			})
		).toEqual({
			...passwordInitialState,
			resetPasswordSuccess: true,
			resetPasswordLoading: false,
			resetPasswordError: '',
		});
	});

	it('should handle RESET_PASSWORD_FAILED', () => {
		expect(
			passwordReducer(passwordInitialState, {
				type: RESET_PASSWORD_FAILED,
				message: 'Error message',
			})
		).toEqual({
			...passwordInitialState,
			resetPasswordError: 'Error message',
			resetPasswordLoading: false,
		});
	});

	it('should handle CLEAR_RESET_PASSWORD', () => {
		const state = {
			forgotPasswordSuccess: false,
			forgotPasswordLoading: false,
			forgotPasswordError: '',
			resetPasswordSuccess: true,
			resetPasswordLoading: false,
			resetPasswordError: 'Error message',
		};

		expect(
			passwordReducer(state, {
				type: CLEAR_RESET_PASSWORD,
			})
		).toEqual({
			forgotPasswordSuccess: false,
			forgotPasswordLoading: false,
			forgotPasswordError: '',
			resetPasswordSuccess: false,
			resetPasswordLoading: false,
			resetPasswordError: '',
		});
	});

});
