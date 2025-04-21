import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';
import { ingredientReducer } from './ingredient';
import { orderReducer } from './order';
import { authReducer } from '@services/reducers/auth';

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	constructor: constructorReducer,
	ingredient: ingredientReducer,
	order: orderReducer,
	auth: authReducer,
});
