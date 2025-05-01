import { BASE_URL } from '@utils/constants';
import { jwtDecode } from 'jwt-decode';

const checkResponse = (res: Response) => {
	console.log(res);
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

interface DecodedToken {
	exp: number;
	[key: string]: any;
}

export const decodeTokenAndGetExp = (
	token: string | undefined
): number | null => {
	if (!token) {
		return null;
	}
	try {
		const decoded: DecodedToken = jwtDecode(token);
		return decoded.exp || null;
	} catch (error) {
		return null;
	}
};
