import {
	postForgotPasswordRequest,
	postResetPasswordRequest,
} from '@services/api';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const CLEAR_FORGOT_PASSWORD = 'CLEAR_FORGOT_PASSWORD';
export const CLEAR_RESET_PASSWORD = 'CLEAR_RESET_PASSWORD';

export const forgotPassword = (email: string) => {
	return function (dispatch: any) {
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

export const resetPassword = (password: string, token: string) => {
	return function (dispatch: any) {
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
