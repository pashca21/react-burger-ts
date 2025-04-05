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

export const createOrderRequest = async (ingredients_ids: string[]) => {
	try {
		const data = await request('orders', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
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
