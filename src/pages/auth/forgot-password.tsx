import React, { ReactNode, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { forgotPassword } from '@services/actions/password';
import { useAppDispatch, useAppSelector } from '@hooks/index';

export const ForgotPasswordPage = (): ReactNode => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [email, setEmail] = useState<string>('');

	const { isAuth } = useAppSelector((state: any) => state.auth);
	if (isAuth) {
		navigate('/');
	}

	const onChange = (e: {
		target: {
			value: string;
		};
	}): void => {
		setEmail(e.target.value);
	};

	const handleClickForgotPassword = (): void => {
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
