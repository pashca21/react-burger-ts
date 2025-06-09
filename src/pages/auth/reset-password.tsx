import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesCommon from '@styles/common.module.css';
import { useAppDispatch, useAppSelector } from '@hooks';
import { resetPassword } from '@services/actions/password';
import { TRootState } from '@utils/types';

export const ResetPasswordPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const { isAuth } = useAppSelector((state: TRootState) => state.auth);
	if (isAuth) {
		navigate('/');
	}

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
		<div className={`${stylesCommon.container}`}>
			<div className={`${stylesCommon.form}`}>
				<h1 className={'mb-6 text text_type_main-large'}>
					Восстановление пароля
				</h1>
				<form className={`${stylesCommon.form}`}>
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
						onPointerEnterCapture={undefined}
						onPointerLeaveCapture={undefined}
					/>
					<Input
						type='text'
						placeholder='Введите код из письма'
						name='token'
						value={form.token}
						onChange={onChange}
						extraClass={'mb-6'}
						required={true}
						onPointerEnterCapture={undefined}
						onPointerLeaveCapture={undefined}
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
