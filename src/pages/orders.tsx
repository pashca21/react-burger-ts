import React, { useState } from 'react';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';
import { logout, updateUser } from '@services/actions/auth';
import { useAppDispatch } from '../hooks/useAppDispatch';
import Cookies from 'js-cookie';

export const OrdersPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { user } = useAppSelector((state: any) => state.auth);
	const { accessToken } = useAppSelector((state: any) => state.auth);

	const [form, setValue] = useState({ name: '', email: '', password: '' });
	const onChange = (e: {
		target: {
			name: string;
			value: string;
		};
	}) => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};
	const saveUserData = () => {
		dispatch<any>(
			updateUser(accessToken, form.name, form.email, form.password)
		);
		navigate('/');
	};

	const logoutClick = () => {
		const refreshToken = Cookies.get('refreshToken') || '';
		dispatch<any>(logout(refreshToken)).then((res: any) => {
			if (res.success) navigate('/');
		});
	};

	return (
		<div className={`${styles.container}`}>
			<section className={styles.section + ' ' + styles.form}>
				<Link to={'/profile'}>
					<p className='text text_type_main-large'>Профиль</p>
				</Link>
				<Link to={'/profile/orders'}>
					<p className='text text_type_main-large'>История заказов</p>
				</Link>
				<Button
					type='secondary'
					size='large'
					htmlType='button'
					onClick={logoutClick}>
					Выход
				</Button>
				<p className='text text_type_main-default text_color_inactive'>
					В этом разделе вы можете изменить свои персональные данные
				</p>
			</section>
			<section className={styles.section}>
				<div className={`${styles.form}`}>История заказов</div>
			</section>
		</div>
	);
};
