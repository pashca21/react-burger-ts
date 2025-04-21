import { BASE_URL } from '@utils/constants';
import { jwtDecode, JwtPayload } from 'jwt-decode';

const checkResponse = (res: Response) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`Ошибка: ${res.status}`);
};

const checkSuccess = (res: any) => {
	if (res && res.success) {
		return res;
	}
	return Promise.reject(`Ответ не success: ${res}`);
};

export const request = async (url: string, options?: RequestInit) => {
	return fetch(BASE_URL + url, options)
		.then(checkResponse)
		.then(checkSuccess);
};

export const decodeToken = (token: string): JwtPayload | null => {
	try {
		return jwtDecode<JwtPayload>(token);
	} catch (error) {
		console.error('Ошибка декодирования токена:', error);
		return null;
	}
};
