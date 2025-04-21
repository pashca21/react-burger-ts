import React, { useEffect } from 'react';
import styles from './login.module.css';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { VIEW_INGREDIENT } from '@services/actions/ingredient';
import { useAppDispatch } from '../hooks/useAppDispatch';

export const IngredientPage = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		// TODO: match ingredient by id in query
		// dispatch({ type: VIEW_INGREDIENT, ingredient: props.ingredient });
	}, []);
	return (
		<div className={`${styles.container}`}>
			<div className={`${styles.form}`}>
				<h1 className={'mb-6 text text_type_main-large'}>Детали ингредиента</h1>
				<IngredientDetails />
			</div>
		</div>
	);
};
