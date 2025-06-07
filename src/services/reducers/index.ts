import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';
import { ingredientReducer } from './ingredient';
import { orderReducer } from './order';
import { authReducer } from '@services/reducers/auth';
import { passwordReducer } from '@services/reducers/password';
import { websocketReducer } from '@services/reducers/websocket';
import { feedOrderReducer } from '@services/reducers/feed-order';

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	constructor: constructorReducer,
	ingredient: ingredientReducer,
	order: orderReducer,
	feedOrder: feedOrderReducer,
	auth: authReducer,
	password: passwordReducer,
	websocket: websocketReducer,
});
