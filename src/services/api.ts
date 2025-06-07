import { request } from '@utils/functions';

export const getIngredientsRequest = async () => {
	try {
		const data = await request('ingredients');
		return {
			success: true,
			ingredients: data.data,
		};
	} catch (error) {
		return {
			success: false,
			message: error,
		};
	}
};

export const createOrderRequest = async (
	ingredients_ids: string[],
	accessToken: string
) => {
	try {
		const data = await request('orders', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + accessToken,
			},
			body: JSON.stringify({
				ingredients: ingredients_ids,
			}),
		});
		return {
			success: true,
			data: data,
		};
	} catch (error) {
		return {
			success: false,
			message: error,
		};
	}
};

export const getOrderRequest = async (order_id: string) => {
	try {
		const data = await request(`orders/${order_id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return {
			success: true,
			data: data,
		};
	} catch (error) {
		return {
			success: false,
			message: error,
		};
	}
};

export const postRegisterRequest = async (
	name: string,
	email: string,
	password: string
) => {
	try {
		const data = await request('auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
				name,
			}),
		});
		return {
			success: true,
			data: data,
		};
	} catch (error) {
		return {
			success: false,
			message: error,
		};
	}
};

export const postLoginRequest = async (email: string, password: string) => {
	try {
		const data = await request('auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		});
		return {
			success: true,
			data: data,
		};
	} catch (error) {
		return {
			success: false,
			message: error,
		};
	}
};

export const postLogoutRequest = async (refreshToken: string) => {
	try {
		const data = await request('auth/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				token: refreshToken,
			}),
		});
		return {
			success: true,
			data: data,
		};
	} catch (error) {
		return {
			success: false,
			message: error,
		};
	}
};

export const postUpdateAccessTokenRequest = async (refreshToken: string) => {
	try {
		const data = await request('auth/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				token: refreshToken,
			}),
		});
		return {
			success: true,
			data: data,
		};
	} catch (error) {
		return {
			success: false,
			message: error,
		};
	}
};

export const postForgotPasswordRequest = async (email: string) => {
	try {
		const data = await request('password-reset', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
			}),
		});
		return {
			success: true,
			data: data,
		};
	} catch (error) {
		return {
			success: false,
			message: error,
		};
	}
};

export const postResetPasswordRequest = async (
	password: string,
	token: string
) => {
	try {
		const data = await request('password-reset/reset', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				password,
				token,
			}),
		});
		return {
			success: true,
			data: data,
		};
	} catch (error) {
		return {
			success: false,
			message: error,
		};
	}
};

export const getUserRequest = async (accessToken: string) => {
	try {
		const data = await request('auth/user', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + accessToken,
			},
		});
		return {
			success: true,
			data: data,
		};
	} catch (error) {
		return {
			success: false,
			message: error,
		};
	}
};

export const patchUserRequest = async (
	accessToken: string,
	name: string,
	email: string,
	password: string
) => {
	try {
		const data = await request('auth/user', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + accessToken,
			},
			body: JSON.stringify({
				email,
				name,
				password,
			}),
		});
		return {
			success: true,
			data: data,
		};
	} catch (error) {
		return {
			success: false,
			message: error,
		};
	}
};
