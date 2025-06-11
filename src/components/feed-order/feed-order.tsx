import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './feed-order.module.css';
import stylesCommon from '@styles/common.module.css';
import {
	getOrderPrice,
	getOrderStatusText,
	modifyDateTimeToReadable,
} from '@utils/functions';
import { useAppSelector } from '@hooks';
import { IIngredient, IOrder, TRootState } from '@utils/types';
import { BurgerIngredientInOrder } from '@components/burger-ingredients/burger-ingredient-in-order';

export const FeedOrderDetails = (props: { order: IOrder }) => {
	const { order } = props;
	const ingredients = useAppSelector(
		(state: TRootState) => state.ingredients.ingredients
	);

	const price = getOrderPrice(order.ingredients, ingredients);

	const ingredientsIdsWithCount: { id: string; count: number }[] = [];
	order.ingredients.forEach((ingredientId: string) => {
		const existingIngredient = ingredientsIdsWithCount.find(
			(item: { id: string }) => item.id === ingredientId
		);
		if (existingIngredient) {
			existingIngredient.count += 1;
		} else {
			ingredientsIdsWithCount.push({ id: ingredientId, count: 1 });
		}
	});

	return (
		<div className={styles.orderDetails}>
			{order.number ? (
				<>
					<p className='text text_type_digits-default mb-10'>#{order.number}</p>
					<p className='text text_type_main-medium mb-2'>{order.name}</p>
					<p className='text text_type_main-small text_color_inactive mb-15'>
						{getOrderStatusText(order.status)}
					</p>
					<p className='text text_type_main-medium mb-6'>Состав:</p>
					<div className={styles.ingredientsScroll + ' mb-10'}>
						{ingredientsIdsWithCount.map(
							(ing: { id: string; count: number }) => {
								const ingredient = ingredients.find(
									(ingredient: IIngredient) => ingredient._id === ing.id
								);
								if (!ingredient) {
									return null;
								}
								return (
									<BurgerIngredientInOrder
										key={ingredient._id}
										ingredient={ingredient}
										count={ing.count}
									/>
								);
							}
						)}
					</div>
					<div className={stylesCommon.row_between + ' ' + stylesCommon.w_100}>
						<p className='text text_type_main-default text_color_inactive'>
							{modifyDateTimeToReadable(order.createdAt)}
						</p>
						<div className={`${stylesCommon.row_end} ml-6`}>
							<p className='text text_type_digits-default mr-2'>{price}</p>
							<CurrencyIcon type='primary' className={''} />
						</div>
					</div>
				</>
			) : (
				<p className='text'>Загрузка...</p>
			)}
		</div>
	);
};
