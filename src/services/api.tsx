export const getIngredientsRequest = async () => {
	const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

	const res = await fetch(API_URL);
	if (!res.ok) {
		return {
			success: false,
			message: `Ошибка: ${res.status}`,
		};
	}
	const data = await res.json();
	return {
		success: true,
		ingredients: data.data,
	};
};

export const createOrderRequest = async (ingredients_ids: string[]) => {
	const API_URL = 'https://norma.nomoreparties.space/api/orders';
	const res = await fetch(API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			ingredients: ingredients_ids,
		}),
	});
	if (!res.ok) {
		return {
			success: false,
			message: `Ошибка: ${res.status}`,
		};
	}
	const data = await res.json();
	return {
		success: true,
		data: data,
	};
};
