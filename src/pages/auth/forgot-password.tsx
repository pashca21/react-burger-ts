import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesCommon from '@styles/common.module.css';
import { useAppDispatch, useAppSelector } from '@hooks';
import { forgotPassword } from '@services/actions/password';
import { TRootState } from '@utils/types';

export const ForgotPasswordPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');

	const { isAuth } = useAppSelector((state: TRootState) => state.auth);
	if (isAuth) {
		navigate('/');
	}

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
		<div className={`${stylesCommon.container}`}>
			<div className={`${stylesCommon.form}`}>
				<h1 className={'mb-6 text text_type_main-large'}>
					Восстановление пароля
				</h1>
				<form className={`${stylesCommon.form}`}>
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
						onPointerEnterCapture={undefined}
						onPointerLeaveCapture={undefined}
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
				<div className={`${stylesCommon.row}`}>
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
