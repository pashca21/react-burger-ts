import {
	getUserRequest,
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
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';
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

export const login = (email: string, password: string) => {
	return function (dispatch: any) {
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

export const logout = (refreshToken: string) => {
	return function (dispatch: any) {
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

export const updateAccessToken = (refreshToken: string) => {
	return function (dispatch: any) {
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
						message: res.message,
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

export const getUser = (accessToken: string, refreshToken: string) => {
	return function (dispatch: any) {
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
					dispatch(updateAccessToken(refreshToken));
					dispatch(getUser(accessToken, refreshToken));
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
) => {
	return function (dispatch: any) {
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
					dispatch(updateAccessToken(refreshToken));
					dispatch(
						updateUser(accessToken, refreshToken, name, email, password)
					);
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
