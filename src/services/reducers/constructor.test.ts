import { constructorReducer } from './constructor';
import {
	ADD_BUN,
	ADD_INGREDIENT,
	REMOVE_INGREDIENT,
	MOVE_INGREDIENT,
	CLEAR_CONSTRUCTOR,
} from '../actions/constructor';
import { TConstructorState, constructorInitialState } from './constructor';
import { IIngredient } from '@utils/types';

describe('constructorReducer', () => {
	const bun: IIngredient = {
		_id: '1',
		name: 'test bun',
		type: 'bun',
		image: '',
		image_mobile: '',
		image_large: '',
		price: 100,
		calories: 200,
		proteins: 10,
		fat: 5,
		carbohydrates: 20,
		__v: 0,
	};

	const ingredient: IIngredient = {
		_id: '2',
		name: 'test ingredient',
		type: 'main',
		image: '',
		image_mobile: '',
		image_large: '',
		price: 50,
		calories: 100,
		proteins: 5,
		fat: 2,
		carbohydrates: 10,
		__v: 0,
	};

	it('should return the initial state', () => {
		expect(constructorReducer(undefined, {} as any)).toEqual(
			constructorInitialState
		);
	});

	it('should add an ingredient', () => {
		expect(
			constructorReducer(constructorInitialState, {
				type: ADD_INGREDIENT,
				ingredient: { ...ingredient, uniqueId: '' },
			})
		).toEqual({
			...constructorInitialState,
			ingredients: [
				expect.objectContaining({
					...ingredient,
					uniqueId: expect.any(String),
				}),
			],
		});
	});

	it('should add a bun', () => {
		expect(
			constructorReducer(constructorInitialState, {
				type: ADD_BUN,
				ingredient: { ...bun, uniqueId: '' },
			})
		).toEqual({
			...constructorInitialState,
			bun: expect.objectContaining({
				...bun,
				uniqueId: expect.any(String),
			}),
		});
	});

	it('should remove an ingredient', () => {
		const state = {
			...constructorInitialState,
			ingredients: [{ ingredient, uniqueId: '' }],
		};
		expect(
			constructorReducer(constructorInitialState, {
				type: REMOVE_INGREDIENT,
				index: 0,
			})
		).toEqual(constructorInitialState);
	});

	it('should move ingredients', () => {
		const state = {
			...constructorInitialState,
			ingredients: [
				ingredient,
				bun,
			],
		};
		expect(
			constructorReducer(state, {
				type: MOVE_INGREDIENT,
				dragIndex: 0,
				hoverIndex: 1,
			})
		).toEqual({
			...constructorInitialState,
			ingredients: [
				ingredient,
				bun,
			],
		});
	});

	it('should clear the constructor', () => {
		const state = {
			...constructorInitialState,
			bun: bun,
			ingredients: [{ ingredient: ingredient, uniqueId: '' }],
		};
		expect(
			constructorReducer(state, {
				type: CLEAR_CONSTRUCTOR,
			})
		).toEqual(constructorInitialState);
	});
});
