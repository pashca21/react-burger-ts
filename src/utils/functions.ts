import { BASE_URL } from '@utils/constants';
import { jwtDecode } from 'jwt-decode';
import { IIngredient } from '@utils/types';

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

export const modifyDateTimeToReadable = (dateTime: string): string => {
	const date = new Date(dateTime);
	const options: Intl.DateTimeFormatOptions = {
		day: '2-digit',
		month: '2-digit',
		year: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	};
	return date.toLocaleString('ru-RU', options);
};

export const getOrderPrice = (
	ingredientsIds: string[],
	ingredients: IIngredient[]
): number => {
	const ingredientMap = new Map(
		ingredients.map((ingredient) => [ingredient._id, ingredient.price])
	);
	return ingredientsIds.reduce((total, id) => {
		const price = ingredientMap.get(id);
		return total + (price || 0);
	}, 0);
};

export const getOrderStatusText = (status: string): string => {
	switch (status) {
		case 'done':
			return 'Выполнен';
		case 'pending':
			return 'Готовится';
		case 'created':
			return 'Создан';
		default:
			return 'Неизвестный статус';
	}
};
