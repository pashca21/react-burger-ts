import React, { useState } from 'react';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';
import { login } from '@services/actions/auth';
import { useAppDispatch } from '../hooks/useAppDispatch';

export const LoginPage = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { isAuth } = useAppSelector((state: any) => state.auth);
	if (isAuth) navigate('/');

	const [form, setValue] = useState({ email: '', password: '' });
	const onChange = (e: {
		target: {
			name: string;
			value: string;
		};
	}) => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};
	const onClick = () => {
		if (!form.email || !form.password) {
			return;
		}
		dispatch<any>(login(form.email, form.password));
		navigate('/');
	};

	return (
		<div className={`${styles.container}`}>
			<div className={`${styles.form}`}>
				<h1 className={'mb-6 text text_type_main-large'}>Вход</h1>
				<form className={`${styles.form}`}>
					<Input
						type='email'
						placeholder='E-mail'
						name='email'
						value={form.email}
						onChange={onChange}
						extraClass={'mb-6'}
						required={true}
					/>
					<Input
						type='password'
						placeholder='Пароль'
						name='password'
						value={form.password}
						onChange={onChange}
						extraClass={'mb-6'}
						icon={'ShowIcon'}
						required={true}
					/>
					<Button
						type='primary'
						htmlType='button'
						onClick={onClick}
						extraClass={'mb-20'}
						size='large'>
						Войти
					</Button>
				</form>
				<div className={`${styles.row} mb-4`}>
					<p className='text text_type_main-default text_color_inactive'>
						Вы - новый пользователь?
					</p>
					<Link to='/register' className='ml-2 text text_type_main-default'>
						Зарегистрироваться
					</Link>
				</div>
				<div className={`${styles.row}`}>
					<p className='text text_type_main-default text_color_inactive'>
						Забыли пароль?
					</p>
					<Link
						to='/forgot-password'
						className='ml-2 text text_type_main-default'>
						Восстановить пароль
					</Link>
				</div>
			</div>
		</div>
	);
};
