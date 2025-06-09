import {
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_FAILED,
	TIngredientsActions,
} from '@services/actions/ingredients';
import { ingredientsReducer, ingredientsInitialState } from './ingredients';
import { IIngredient } from '@utils/types';

describe('ingredients reducer', () => {
	it('should return the initial state', () => {
		expect(ingredientsReducer(undefined, {} as TIngredientsActions)
		).toEqual(
			ingredientsInitialState
		);
	});

	it('should handle GET_INGREDIENTS_REQUEST', () => {
		expect(
			ingredientsReducer(ingredientsInitialState, {
				type: GET_INGREDIENTS_REQUEST,
			})
		).toEqual({
			...ingredientsInitialState,
			loading: true,
		});
	});

	it('should handle GET_INGREDIENTS_SUCCESS', () => {
		const ingredients: IIngredient[] = [
			{
				_id: '1',
				name: 'Ingredient 1',
				type: '',
				image: '',
				image_mobile: '',
				image_large: '',
				price: 0,
				calories: 0,
				proteins: 0,
				fat: 0,
				carbohydrates: 0,
				__v: 0,
			},
			{
				_id: '2',
				name: 'Ingredient 2',
				type: '',
				image: '',
				image_mobile: '',
				image_large: '',
				price: 0,
				calories: 0,
				proteins: 0,
				fat: 0,
				carbohydrates: 0,
				__v: 0,
			},
		];
		expect(
			ingredientsReducer(ingredientsInitialState, {
				type: GET_INGREDIENTS_SUCCESS,
				ingredients,
			})
		).toEqual({
			...ingredientsInitialState,
			ingredients,
			loading: false,
			error: false,
		});
	});

	it('should handle GET_INGREDIENTS_FAILED', () => {
		expect(
			ingredientsReducer(ingredientsInitialState, {
				type: GET_INGREDIENTS_FAILED,
			})
		).toEqual({
			...ingredientsInitialState,
			error: true,
			loading: false,
		});
	});
});
