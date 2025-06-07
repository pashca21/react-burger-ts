import { Key } from 'react';

export interface IIngredient {
	uniqueId?: string;
	_id: Key | null | undefined;
	name: string;
	type: string;
	image: string;
	image_mobile: string;
	image_large: string;
	price: number;
	calories: number;
	proteins: number;
	fat: number;
	carbohydrates: number;
	__v: number;
}
