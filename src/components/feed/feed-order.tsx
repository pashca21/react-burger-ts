import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './feed.module.css';
import stylesCommon from '../../styles/common.module.css';
import { IOrder, TRootState } from '@utils/types';
import {
	getOrderPrice,
	getOrderStatusText,
	modifyDateTimeToReadable,
} from '@utils/functions';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
	VIEW_FEED_ORDER,
	CLOSE_FEED_ORDER,
} from '@services/actions/feed-order';
import { Modal } from '@components/modal/modal';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useModal } from '../../hooks/useModal';
import { FeedOrderDetails } from '@components/feed-order/feed-order';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const FeedOrder = (props: { order: IOrder }) => {
	const dispatch = useAppDispatch();
	const { isModalOpen, openModal, closeModal } = useModal();
	const [searchParams] = useSearchParams();

	const { order } = props;
	const ingredients = useAppSelector(
		(state: TRootState) => state.ingredients.ingredients
	);
	const price = getOrderPrice(order.ingredients, ingredients);

	const handleOrderClick = () => {
		dispatch({ type: VIEW_FEED_ORDER, order: order });
		openModal();
		window.history.pushState({ fromHome: true }, '', '/feed/' + order._id);
	};

	const handleOrderClose = () => {
		closeModal();
		dispatch({ type: CLOSE_FEED_ORDER });
		window.history.pushState({}, '', '/');
	};

	useEffect(() => {
		if (searchParams.get('openModalOrderId') === order._id) {
			handleOrderClick();
		}
	}, [searchParams, order._id, handleOrderClick]);

	return (
		<>
			<div
				className={`${styles.order} mb-4 p-6 mr-2`}
				onClick={handleOrderClick}>
				<div className={stylesCommon.row_between}>
					<p className='text text_type_main-default'>#{order.number}</p>
					<p className='text text_type_main-default text_color_inactive'>
						{modifyDateTimeToReadable(order.createdAt)}
					</p>
				</div>
				<div className={'mt-6 mb-6'}>
					<p className='text text_type_main-medium'>{order.name}</p>
					<p className='text text_type_main-default'>
						{getOrderStatusText(order.status)}
					</p>
				</div>
				<div className={stylesCommon.row_between}>
					<div className={styles.images_row}>
						{order.ingredients.slice(0, 5).map((ingredientId, index) => {
							const ingredient = ingredients.find(
								(ing: { _id: string | undefined }) => ing._id === ingredientId
							);
							if (!ingredient) {
								return null;
							}
							return (
								<img
									key={index}
									src={ingredient.image_mobile}
									alt={ingredient.name}
									className={styles.image}
									style={{
										zIndex: order.ingredients.length - index,
										marginLeft: index > 0 ? '-15px' : '0',
									}}
								/>
							);
						})}
						{order.ingredients.length > 5 && (
							<div
								className={styles.image}
								style={{
									zIndex: 0,
									marginLeft: '-15px',
									background: '#131316',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									color: '#ffffff',
									fontWeight: 700,
									fontSize: '18px',
								}}>
								<p className='text text_type_digits-default'>
									+{order.ingredients.length - 5}
								</p>
							</div>
						)}
					</div>
					<div className={`${stylesCommon.row_end} ml-6`}>
						<p className='text text_type_digits-default mr-2'>{price}</p>
						<CurrencyIcon type='primary' className={''} />
					</div>
				</div>
			</div>
			{isModalOpen && (
				<Modal onClose={handleOrderClose} title='Информация о заказе'>
					<FeedOrderDetails order={order} />
				</Modal>
			)}
		</>
	);
};
