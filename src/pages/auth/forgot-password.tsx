import React, { useState } from 'react';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { forgotPassword } from '@services/actions/password';
import { useAppSelector } from '../../hooks/useAppSelector';

export const ForgotPasswordPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');

	const { isAuth } = useAppSelector((state: any) => state.auth);
	if (isAuth) navigate('/');

	const onChange = (e: {
		target: {
			value: string;
		};
	}) => {
		setEmail(e.target.value);
	};

	const handleClickForgotPassword = () => {
		dispatch<any>(forgotPassword(email));
		navigate('/reset-password');
	};

	return (
		<div className={`${styles.container}`}>
			<div className={`${styles.form}`}>
				<h1 className={'mb-6 text text_type_main-large'}>
					Восстановление пароля
				</h1>
				<form className={`${styles.form}`}>
					<Input
						type='email'
						placeholder='Укажите e-mail'
						name='email'
						value={email}
						onChange={onChange}
						extraClass={'mb-6'}
						errorText={'Введите корректный e-mail'}
						required={true}
						autoComplete={'email'}
					/>
					<Button
						type='primary'
						htmlType='button'
						onClick={handleClickForgotPassword}
						extraClass={'mb-20'}
						size='large'>
						Восстановить
					</Button>
				</form>
				<div className={`${styles.row}`}>
					<p className='text text_type_main-default text_color_inactive'>
						Вспомнили пароль?
					</p>
					<Link to='/login' className='ml-2 text text_type_main-default'>
						Войти
					</Link>
				</div>
			</div>
		</div>
	);
};
