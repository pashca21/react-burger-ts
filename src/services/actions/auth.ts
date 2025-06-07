import {
	getUserRequest,
	patchUserRequest,
	postLoginRequest,
	postLogoutRequest,
	postRegisterRequest,
	postUpdateAccessTokenRequest,
} from '@services/api';
import Cookies from 'js-cookie';

import { AppDispatch } from '../../index';
import { AppThunk } from '@utils/types';

export const REGISTER_REQUEST = 'REGISTER_REQUEST' as const;
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS' as const;
export const REGISTER_FAILED = 'REGISTER_FAILED' as const;
export const UPDATE_ACCESS_TOKEN_REQUEST =
	'UPDATE_ACCESS_TOKEN_REQUEST' as const;
export const UPDATE_ACCESS_TOKEN_SUCCESS =
	'UPDATE_ACCESS_TOKEN_SUCCESS' as const;
export const UPDATE_ACCESS_TOKEN_FAILED = 'UPDATE_ACCESS_TOKEN_FAILED' as const;
export const LOGIN_REQUEST = 'LOGIN_REQUEST' as const;
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS' as const;
export const LOGIN_FAILED = 'LOGIN_FAILED' as const;
export const CLEAR_LOGIN = 'CLEAR_LOGIN' as const;
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST' as const;
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS' as const;
export const LOGOUT_FAILED = 'LOGOUT_FAILED' as const;
export const GET_USER_REQUEST = 'GET_USER_REQUEST' as const;
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS' as const;
export const GET_USER_FAILED = 'GET_USER_FAILED' as const;
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST' as const;
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS' as const;
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED' as const;

export interface IRegisterRequestAction {
	readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterSuccessAction {
	readonly type: typeof REGISTER_SUCCESS;
	readonly user: any;
	readonly accessToken: string;
}

export interface IRegisterFailedAction {
	readonly type: typeof REGISTER_FAILED;
	readonly message?: string;
}

export interface IUpdateAccessTokenRequestAction {
	readonly type: typeof UPDATE_ACCESS_TOKEN_REQUEST;
}

export interface IUpdateAccessTokenSuccessAction {
	readonly type: typeof UPDATE_ACCESS_TOKEN_SUCCESS;
	readonly accessToken: string;
}

export interface IUpdateAccessTokenFailedAction {
	readonly type: typeof UPDATE_ACCESS_TOKEN_FAILED;
	readonly message?: string;
	readonly response?: any;
}

export interface ILoginRequestAction {
	readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccessAction {
	readonly type: typeof LOGIN_SUCCESS;
	readonly user: any;
	readonly accessToken: string;
}

export interface ILoginFailedAction {
	readonly type: typeof LOGIN_FAILED;
	readonly message?: string;
}

export interface IClearLoginAction {
	readonly type: typeof CLEAR_LOGIN;
}

export interface ILogoutRequestAction {
	readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutSuccessAction {
	readonly type: typeof LOGOUT_SUCCESS;
}

export interface ILogoutFailedAction {
	readonly type: typeof LOGOUT_FAILED;
	readonly message?: string;
}

export interface IGetUserRequestAction {
	readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserSuccessAction {
	readonly type: typeof GET_USER_SUCCESS;
	readonly user: any;
}

export interface IGetUserFailedAction {
	readonly type: typeof GET_USER_FAILED;
	readonly message?: string;
}

export interface IUpdateUserRequestAction {
	readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IUpdateUserSuccessAction {
	readonly type: typeof UPDATE_USER_SUCCESS;
	readonly user: any;
}

export interface IUpdateUserFailedAction {
	readonly type: typeof UPDATE_USER_FAILED;
	readonly message?: string;
}

export type TAuthActions =
	| IRegisterRequestAction
	| IRegisterSuccessAction
	| IRegisterFailedAction
	| IUpdateAccessTokenRequestAction
	| IUpdateAccessTokenSuccessAction
	| IUpdateAccessTokenFailedAction
	| ILoginRequestAction
	| ILoginSuccessAction
	| ILoginFailedAction
	| IClearLoginAction
	| ILogoutRequestAction
	| ILogoutSuccessAction
	| ILogoutFailedAction
	| IGetUserRequestAction
	| IGetUserSuccessAction
	| IGetUserFailedAction
	| IUpdateUserRequestAction
	| IUpdateUserSuccessAction
	| IUpdateUserFailedAction;

export const register = (
	name: string,
	email: string,
	password: string
): AppThunk => {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: REGISTER_REQUEST,
		});
		postRegisterRequest(name, email, password)
			.then((res) => {
				if (res.success) {
					const accessToken = res.data.accessToken.replace('Bearer ', '');
					dispatch({
						type: REGISTER_SUCCESS,
						user: res.data.user,
						accessToken: accessToken,
					});
					Cookies.set('refreshToken', res.data.refreshToken);
				} else {
					dispatch({
						type: REGISTER_FAILED,
					});
				}
			})
			.catch((err) => {
				dispatch({
					type: REGISTER_FAILED,
					message: err.message,
				});
			});
	};
};

export const login = (email: string, password: string): AppThunk => {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: LOGIN_REQUEST,
		});
		postLoginRequest(email, password)
			.then((res) => {
				if (res.success) {
					const accessToken = res.data.accessToken.replace('Bearer ', '');
					dispatch({
						type: LOGIN_SUCCESS,
						user: res.data.user,
						accessToken: accessToken,
					});
					Cookies.set('refreshToken', res.data.refreshToken);
				} else {
					dispatch({
						type: LOGIN_FAILED,
					});
				}
			})
			.then(() => {
				dispatch({
					type: CLEAR_LOGIN,
				});
			})
			.catch((err) => {
				dispatch({
					type: LOGIN_FAILED,
					message: err.message,
				});
			});
	};
};

export const logout = (refreshToken: string): AppThunk => {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: LOGOUT_REQUEST,
		});
		postLogoutRequest(refreshToken)
			.then((res) => {
				if (res.success) {
					Cookies.remove('refreshToken');
					dispatch({
						type: LOGOUT_SUCCESS,
					});
				} else {
					dispatch({
						type: LOGOUT_FAILED,
					});
				}
			})
			.catch((err) => {
				dispatch({
					type: LOGOUT_FAILED,
					message: err.message,
				});
			});
	};
};

export const updateAccessToken = (
	refreshToken: string
): ((dispatch: AppDispatch) => void) => {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: UPDATE_ACCESS_TOKEN_REQUEST,
		});
		postUpdateAccessTokenRequest(refreshToken)
			.then((res) => {
				const accessToken = res.data.accessToken.replace('Bearer ', '');
				if (res.success) {
					dispatch({
						type: UPDATE_ACCESS_TOKEN_SUCCESS,
						accessToken: accessToken,
					});
					Cookies.set('refreshToken', res.data.refreshToken);
				} else {
					dispatch({
						type: UPDATE_ACCESS_TOKEN_FAILED,
						message: res.message as string,
						response: res,
					});
				}
			})
			.catch((err) => {
				dispatch({
					type: UPDATE_ACCESS_TOKEN_FAILED,
					message: err.message,
					response: err,
				});
			});
	};
};

export const getUser = (
	accessToken: string,
	refreshToken: string
): AppThunk => {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: GET_USER_REQUEST,
		});
		getUserRequest(accessToken)
			.then((res) => {
				if (res.success) {
					dispatch({
						type: GET_USER_SUCCESS,
						user: res.data.user,
					});
				} else if (res.message === 'token expires') {
					dispatch({
						type: UPDATE_ACCESS_TOKEN_REQUEST,
						refreshToken: refreshToken,
					});
					dispatch({
						type: GET_USER_REQUEST,
					});
				} else {
					dispatch({
						type: GET_USER_FAILED,
					});
				}
			})
			.catch((err) => {
				dispatch({
					type: GET_USER_FAILED,
					message: err.message,
				});
			});
	};
};

export const updateUser = (
	accessToken: string,
	refreshToken: string,
	name: string,
	email: string,
	password: string
): AppThunk => {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: UPDATE_USER_REQUEST,
		});
		patchUserRequest(accessToken, name, email, password)
			.then((res) => {
				if (res.success) {
					dispatch({
						type: UPDATE_USER_SUCCESS,
						user: res.data.user,
					});
				} else if (res.message === 'token expires') {
					dispatch({
						type: UPDATE_ACCESS_TOKEN_REQUEST,
					});
					dispatch({
						type: UPDATE_USER_REQUEST,
					});
				} else {
					dispatch({
						type: UPDATE_USER_FAILED,
					});
				}
			})
			.catch((err) => {
				dispatch({
					type: UPDATE_USER_FAILED,
					message: err.message,
				});
			});
	};
};
