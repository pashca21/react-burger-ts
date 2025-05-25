import React, { ReactNode, useState } from 'react';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '@services/actions/password';
import { useAppDispatch, useAppSelector } from '@hooks/index';

export const ResetPasswordPage = (): ReactNode => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const { isAuth } = useAppSelector((state: any) => state.auth);
	if (isAuth) {
		navigate('/');
	}

	const [form, setValue] = useState<{ password: string; token: string }>({
		password: '',
		token: '',
	});
	const onChange = (e: {
		target: {
			name: string;
			value: string;
		};
	}): void => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};
	const handleClickResetPassword = (): void => {
		dispatch<any>(resetPassword(form.password, form.token));
		navigate('/login', { state: { from: location } });
		return;
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
