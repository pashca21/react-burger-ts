import React, { useState } from 'react';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '@services/actions/password';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

export const ResetPasswordPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const { isAuth } = useAppSelector((state: any) => state.auth);
	if (isAuth) navigate('/');

	const [form, setValue] = useState({ password: '', token: '' });
	const onChange = (e: {
		target: {
			name: string;
			value: string;
		};
	}) => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};
	const handleClickResetPassword = () => {
		dispatch<any>(resetPassword(form.password, form.token));
		navigate('/login', { state: { from: location } });
	};

	return (
		<div className={`${styles.container}`}>
			<div className={`${styles.form}`}>
				<h1 className={'mb-6 text text_type_main-large'}>
					Восстановление пароля
				</h1>
				<form className={`${styles.form}`}>
					<Input
						type='password'
						placeholder='Введите новый пароль'
						name='password'
						value={form.password}
						onChange={onChange}
						extraClass={'mb-6'}
						icon={'ShowIcon'}
						required={true}
						autoComplete={'new-password'}
					/>
					<Input
						type='text'
						placeholder='Введите код из письма'
						name='token'
						value={form.token}
						onChange={onChange}
						extraClass={'mb-6'}
						required={true}
					/>
					<Button
						type='primary'
						onClick={handleClickResetPassword}
						htmlType='button'
						extraClass={'mb-20'}
						size='large'>
						Сохранить
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
