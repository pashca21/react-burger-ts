import React, { useEffect } from 'react';
import styles from './login.module.css';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { VIEW_INGREDIENT } from '@services/actions/ingredient';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useNavigate, useParams } from 'react-router-dom';
import { getIngredients } from '@services/actions/ingredients';
import { useAppSelector } from '../hooks/useAppSelector';
import { IngredientProps } from '@utils/types';

export const IngredientPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	const {
		loading: loadingIngredients,
		error: errorIngredients,
		ingredients,
	} = useAppSelector((state: any) => state.ingredients);

	useEffect(() => {
		if (ingredients.length === 0 && !loadingIngredients) {
			dispatch<any>(getIngredients());
		}
	}, [dispatch, ingredients, loadingIngredients]);

	const ingredient = ingredients.find(
		(ingredient: IngredientProps) => ingredient._id === id
	);

	useEffect(() => {
		if (performance.navigation.type === 1) {
			navigate('/?openModalIngredientId=' + id);
		}
	}, [dispatch]);

	if (loadingIngredients) {
		return <p>Загрузка...</p>;
	}

	if (errorIngredients) {
		return <p>Ошибка загрузки ингредиентов: {errorIngredients}</p>;
	}

	if (ingredient) {
		dispatch({ type: VIEW_INGREDIENT, ingredient: ingredient });
	} else {
		return <p>Ингредиент не найден</p>;
	}

	return (
		<div className={`${styles.container}`}>
			<div className={`${styles.form}`}>
				<h1 className={'mb-6 text text_type_main-large'}>Детали ингредиента</h1>
				<IngredientDetails />
			</div>
		</div>
	);
};
