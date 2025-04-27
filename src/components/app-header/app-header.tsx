import { useNavigate } from 'react-router-dom';
import {
	Button,
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

export const AppHeader = () => {
	const navigate = useNavigate();

	const handleHomeLink = () => {
		navigate('/');
	};

	const handleProfileLink = () => {
		navigate('/profile');
	};

	const handleOrdersLink = () => {
		navigate('/profile/orders');
	};

	return (
		<header className={styles.header}>
			<div className={styles.left_buttons}>
				<Button
					htmlType='button'
					onClick={handleHomeLink}
					type='secondary'
					size='medium'
					extraClass={`${styles.button} mt-5 mb-4`}>
					<BurgerIcon type='secondary' className={'ml-5 mr-2'} />
					Конструктор
				</Button>
				<Button
					htmlType='button'
					onClick={handleOrdersLink}
					type='secondary'
					size='medium'
					extraClass={`${styles.button} mt-5 mb-4`}>
					<ListIcon type='secondary' className={'ml-5 mr-2'} />
					Лента заказов
				</Button>
			</div>
			<div>
				<Logo />
			</div>
			<div>
				<Button
					htmlType='button'
					onClick={handleProfileLink}
					type='secondary'
					size='medium'
					extraClass={`${styles.button} mt-5 mb-4`}>
					<ProfileIcon type='secondary' className={'ml-5 mr-2'} />
					Личный кабинет
				</Button>
			</div>
		</header>
	);
};
