import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';
import { ingredientReducer } from './ingredient';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	constructor: constructorReducer,
	ingredient: ingredientReducer,
	order: orderReducer,
});
