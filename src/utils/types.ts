import { Key } from 'react';

export interface Ingredient {
	_id: Key | null | undefined;
	name: string;
	type: string;
	image: string;
	price: number;
}
