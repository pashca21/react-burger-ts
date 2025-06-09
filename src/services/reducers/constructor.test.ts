import {
	ADD_BUN,
	ADD_INGREDIENT,
	MOVE_INGREDIENT,
	REMOVE_INGREDIENT,
	CLEAR_CONSTRUCTOR,
	TConstructorActions,
} from '@services/actions/constructor';
import {
	constructorReducer,
	constructorInitialState,
} from '@services/reducers/constructor';
import { IIngredient } from '@utils/types';

describe('constructor reducer', () => {
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
		expect(
			constructorReducer(undefined, {} as TConstructorActions)
		).toEqual(
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
		const initialState = {
			...constructorInitialState,
			ingredients: [{ ...ingredient, uniqueId: '' }],
		};
		expect(
			constructorReducer(initialState, {
				type: REMOVE_INGREDIENT,
				index: 0,
			})
		).toEqual(constructorInitialState);
	});

	it('should move ingredients', () => {
		const initialState = {
			...constructorInitialState,
			ingredients: [
				ingredient,
				bun,
			],
		};
		expect(
			constructorReducer(initialState, {
				type: MOVE_INGREDIENT,
				dragIndex: 0,
				hoverIndex: 1,
			})
		).toEqual({
			...constructorInitialState,
			ingredients: [
				bun,
				ingredient,
			],
		});
	});

	it('should clear the constructor', () => {
		const initialState = {
			...constructorInitialState,
			bun: bun,
			ingredients: [{ ...ingredient, uniqueId: '' }],
		};
		expect(
			constructorReducer(initialState, {
				type: CLEAR_CONSTRUCTOR,
			})
		).toEqual(constructorInitialState);
	});
});
