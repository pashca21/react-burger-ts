import React, { useEffect } from 'react';
import styles from '../auth/login.module.css';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { VIEW_INGREDIENT } from '@services/actions/ingredient';
import { useNavigate, useParams } from 'react-router-dom';
import { getIngredients } from '@services/actions/ingredients';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { IIngredient } from '@interfaces/index';

export const IngredientPage = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	const ingredient = useAppSelector(
		(state: any) => state.ingredient.ingredient
	);

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

	useEffect(() => {
		if (performance.navigation.type === 1) {
			navigate('/?openModalIngredientId=' + id);
		}
	}, [dispatch, id, navigate]);

	useEffect(() => {
		const ingredient = ingredients.find(
			(ingredient: IIngredient) => ingredient._id === id
		);
		if (ingredient) {
			dispatch({ type: VIEW_INGREDIENT, ingredient: ingredient });
		}
	}, [dispatch, id, ingredient, ingredients]);

	if (loadingIngredients) {
		return <p>Загрузка...</p>;
	}

	if (errorIngredients) {
		return <p>Ошибка загрузки ингредиентов: {errorIngredients}</p>;
	}

	if (!ingredient) {
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
