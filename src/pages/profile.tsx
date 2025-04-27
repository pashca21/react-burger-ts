import React, { useEffect, useState } from 'react';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile.module.css';
import stylesCommon from '../styles/common.module.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';
import { updateUser } from '@services/actions/auth';
import { useAppDispatch } from '../hooks/useAppDispatch';

export const ProfilePage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { user } = useAppSelector((state: any) => state.auth);
	const { accessToken } = useAppSelector((state: any) => state.auth);

	const [isDataChanged, setIsDataChanged] = useState(false);

	const [form, setValue] = useState({
		name: user.name,
		email: user.email,
		password: '',
	});
	const onChange = (e: {
		target: {
			name: string;
			value: string;
		};
	}) => {
		setValue({ ...form, [e.target.name]: e.target.value });
		if (
			user.name !== form.name ||
			user.email !== form.email ||
			user.password !== form.password
		) {
			setIsDataChanged(true);
		} else {
			setIsDataChanged(false);
		}
	};
	const saveUserData = () => {
		dispatch<any>(
			updateUser(accessToken, form.name, form.email, form.password)
		);
		navigate('/');
	};

	const cancelSaveUserData = () => {
		setValue({ name: user.name, email: user.email, password: '' });
		setIsDataChanged(false);
	};

	useEffect(() => {
		setValue({ name: user.name, email: user.email, password: '' });
	}, [user]);

	return (
		<div className={`${styles.container}`}>
			<section className={styles.section + ' ' + styles.form}>
				<NavLink
					to={'/profile'}
					className={({ isActive }) =>
						isActive ? styles.active : 'text_color_inactive'
					}>
					<p className='text text_type_main-large'>Профиль</p>
				</NavLink>
				<NavLink
					to={'/profile/orders'}
					className={({ isActive }) =>
						isActive ? styles.active : 'text_color_inactive'
					}>
					<p className='text text_type_main-large'>История заказов</p>
				</NavLink>
				<Link to={'/logout'}>
					<p className='text text_type_main-large text_color_inactive'>Выход</p>
				</Link>
				<p className='text text_type_main-default text_color_inactive'>
					В этом разделе вы можете изменить свои персональные данные
				</p>
			</section>
			<section className={styles.section}>
				<div className={`${styles.form}`}>
					<form className={`${styles.form}`}>
						<Input
							type='text'
							placeholder='Имя'
							name='name'
							value={form.name}
							onChange={onChange}
							extraClass={'mb-6'}
							icon={'EditIcon'}
						/>
						<Input
							type='email'
							placeholder='Логин'
							name='email'
							value={form.email}
							onChange={onChange}
							extraClass={'mb-6'}
							icon={'EditIcon'}
						/>
						<Input
							type='password'
							placeholder='Пароль'
							name='password'
							value={form.password}
							onChange={onChange}
							extraClass={'mb-6'}
							icon={'EditIcon'}
						/>
						{isDataChanged && (
							<div className={stylesCommon.row_between}>
								<Button
									type='secondary'
									htmlType='button'
									onClick={cancelSaveUserData}
									extraClass={'mb-20'}
									size='large'>
									Отмена
								</Button>
								<Button
									type='primary'
									htmlType='button'
									onClick={saveUserData}
									extraClass={'mb-20'}
									size='large'>
									Сохранить
								</Button>
							</div>
						)}
					</form>
				</div>
			</section>
		</div>
	);
};
