import {
	patchUserRequest,
	postLoginRequest,
	postLogoutRequest,
	postRegisterRequest,
	postUpdateAccessTokenRequest,
} from '@services/api';
import Cookies from 'js-cookie';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const CLEAR_REGISTER_FORM = 'CLEAR_REGISTER_FORM';
export const UPDATE_ACCESS_TOKEN_REQUEST = 'UPDATE_ACCESS_TOKEN_REQUEST';
export const UPDATE_ACCESS_TOKEN_SUCCESS = 'UPDATE_ACCESS_TOKEN_SUCCESS';
export const UPDATE_ACCESS_TOKEN_FAILED = 'UPDATE_ACCESS_TOKEN_FAILED';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const CLEAR_LOGIN = 'CLEAR_LOGIN';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

export const register = (name: string, email: string, password: string) => {
	return function (dispatch: any) {
		dispatch({
			type: REGISTER_REQUEST,
		});
		postRegisterRequest(name, email, password)
			.then((res) => {
				if (res.success) {
					console.log(res.data);
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
				console.error(err);
				dispatch({
					type: REGISTER_FAILED,
					message: err.message,
				});
			});
	};
};

export const login = (email: string, password: string) => {
	return function (dispatch: any) {
		dispatch({
			type: LOGIN_REQUEST,
		});
		postLoginRequest(email, password)
			.then((res) => {
				if (res.success) {
					dispatch({
						type: LOGIN_SUCCESS,
						user: res.data.user,
					});
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
				console.error(err);
				dispatch({
					type: LOGIN_FAILED,
					message: err.message,
				});
			});
	};
};

export const logout = (refreshToken: string) => {
	return function (dispatch: any) {
		dispatch({
			type: LOGOUT_REQUEST,
		});
		postLogoutRequest(refreshToken)
			.then((res) => {
				if (res.success) {
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
				console.error(err);
				dispatch({
					type: LOGOUT_FAILED,
					message: err.message,
				});
			});
	};
};

export const updateAccessToken = (refreshToken: string) => {
	return function (dispatch: any) {
		dispatch({
			type: UPDATE_ACCESS_TOKEN_REQUEST,
		});
		postUpdateAccessTokenRequest(refreshToken)
			.then((res) => {
				if (res.success) {
					dispatch({
						type: UPDATE_ACCESS_TOKEN_SUCCESS,
						accessToken: res.data.accessToken,
					});
				} else {
					dispatch({
						type: UPDATE_ACCESS_TOKEN_FAILED,
					});
				}
			})
			.catch((err) => {
				console.error(err);
				dispatch({
					type: UPDATE_ACCESS_TOKEN_FAILED,
					message: err.message,
				});
			});
	};
};

export const updateUser = (
	accessToken: string,
	name: string,
	email: string,
	password: string
) => {
	return function (dispatch: any) {
		dispatch({
			type: UPDATE_USER_REQUEST,
		});
		patchUserRequest(accessToken, name, email, password)
			.then((res) => {
				if (res.success) {
					console.log(res.data);
					dispatch({
						type: UPDATE_USER_SUCCESS,
						user: res.data.user,
					});
				} else {
					dispatch({
						type: UPDATE_USER_FAILED,
					});
				}
			})
			.catch((err) => {
				console.error(err);
				dispatch({
					type: UPDATE_USER_FAILED,
					message: err.message,
				});
			});
	};
};
