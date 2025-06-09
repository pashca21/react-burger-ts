import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesCommon from '@styles/common.module.css';
import { register } from '@services/actions/auth';
import { useAppDispatch, useAppSelector } from '@hooks';
import { TRootState } from '@utils/types';

export const RegisterPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { isAuth } = useAppSelector((state: TRootState) => state.auth);
	if (isAuth) {
		navigate('/');
	}

	const [form, setValue] = useState({ name: '', email: '', password: '' });
	const onChange = (e: {
		target: {
			name: string;
			value: string;
		};
	}) => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};
	const onClick = () => {
		dispatch<any>(register(form.name, form.email, form.password));
		navigate('/');
	};

	return (
		<div className={`${stylesCommon.container}`}>
			<div className={`${stylesCommon.form}`}>
				<h1 className={'mb-6 text text_type_main-large'}>Регистрация</h1>
				<form className={`${stylesCommon.form}`}>
					<Input
						type='text'
						placeholder='Имя'
						name={'name'}
						value={form.name}
						onChange={onChange}
						extraClass={'mb-6'}
						required={true}
						autoComplete={'name'}
						onPointerEnterCapture={undefined}
						onPointerLeaveCapture={undefined}
					/>
					<Input
						type='email'
						placeholder='E-mail'
						name={'email'}
						value={form.email}
						onChange={onChange}
						extraClass={'mb-6'}
						required={true}
						autoComplete={'email'}
						onPointerEnterCapture={undefined}
						onPointerLeaveCapture={undefined}
					/>
					<Input
						type='password'
						placeholder='Пароль'
						name={'password'}
						value={form.password}
						onChange={onChange}
						extraClass={'mb-6'}
						icon={'ShowIcon'}
						required={true}
						autoComplete={'new-password'}
						onPointerEnterCapture={undefined}
						onPointerLeaveCapture={undefined}
					/>
					<Button
						type='primary'
						onClick={onClick}
						htmlType='button'
						extraClass={'mb-20'}
						size='large'>
						Зарегистрироваться
					</Button>
				</form>
				<div className={`${stylesCommon.row}`}>
					<p className='text text_type_main-default text_color_inactive'>
						Уже зарегистрированы?
					</p>
					<Link to='/login' className='ml-2 text text_type_main-default'>
						Войти
					</Link>
				</div>
			</div>
		</div>
	);
};
