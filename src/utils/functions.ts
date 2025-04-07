import { BASE_URL } from '@utils/constants';

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
