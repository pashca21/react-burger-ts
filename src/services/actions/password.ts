import {
	postForgotPasswordRequest,
	postResetPasswordRequest,
} from '@services/api';
import { TAppDispatch, TAppThunk } from '@utils/types';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST' as const;
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS' as const;
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED' as const;
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST' as const;
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS' as const;
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED' as const;
export const CLEAR_FORGOT_PASSWORD = 'CLEAR_FORGOT_PASSWORD' as const;
export const CLEAR_RESET_PASSWORD = 'CLEAR_RESET_PASSWORD' as const;

export interface IForgotPasswordRequestAction {
	readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

export interface IForgotPasswordSuccessAction {
	readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface IForgotPasswordFailedAction {
	readonly type: typeof FORGOT_PASSWORD_FAILED;
	readonly message?: string;
}

export interface IResetPasswordRequestAction {
	readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordSuccessAction {
	readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface IResetPasswordFailedAction {
	readonly type: typeof RESET_PASSWORD_FAILED;
	readonly message?: string;
}

export interface IClearForgotPasswordAction {
	readonly type: typeof CLEAR_FORGOT_PASSWORD;
}

export interface IClearResetPasswordAction {
	readonly type: typeof CLEAR_RESET_PASSWORD;
}

export type TPasswordActions =
	| IForgotPasswordRequestAction
	| IForgotPasswordSuccessAction
	| IForgotPasswordFailedAction
	| IResetPasswordRequestAction
	| IResetPasswordSuccessAction
	| IResetPasswordFailedAction
	| IClearForgotPasswordAction
	| IClearResetPasswordAction;

export const forgotPassword = (email: string): TAppThunk => {
	return function (dispatch: TAppDispatch) {
		dispatch({
			type: FORGOT_PASSWORD_REQUEST,
		});
		postForgotPasswordRequest(email)
			.then((res) => {
				if (res.success) {
					dispatch({
						type: FORGOT_PASSWORD_SUCCESS,
					});
				} else {
					dispatch({
						type: FORGOT_PASSWORD_FAILED,
					});
				}
			})
			.then(() => {
				dispatch({
					type: CLEAR_FORGOT_PASSWORD,
				});
			})
			.catch((err) => {
				dispatch({
					type: FORGOT_PASSWORD_FAILED,
					message: err.message,
				});
			});
	};
};

export const resetPassword = (password: string, token: string): TAppThunk => {
	return function (dispatch: TAppDispatch) {
		dispatch({
			type: RESET_PASSWORD_REQUEST,
		});
		postResetPasswordRequest(password, token)
			.then((res) => {
				if (res.success) {
					dispatch({
						type: RESET_PASSWORD_SUCCESS,
					});
				} else {
					dispatch({
						type: RESET_PASSWORD_FAILED,
					});
				}
			})
			.then(() => {
				dispatch({
					type: CLEAR_RESET_PASSWORD,
				});
			})
			.catch((err) => {
				dispatch({
					type: RESET_PASSWORD_FAILED,
					message: err.message,
				});
			});
	};
};
