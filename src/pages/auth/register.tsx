import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { register } from '@services/actions/auth';
import { useAppDispatch, useAppSelector } from '@hooks/index';

export const RegisterPage = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { isAuth } = useAppSelector((state: any) => state.auth);
	if (isAuth) navigate('/');

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
		<div className={`${styles.container}`}>
			<div className={`${styles.form}`}>
				<h1 className={'mb-6 text text_type_main-large'}>Регистрация</h1>
				<form className={`${styles.form}`}>
					<Input
						type='text'
						placeholder='Имя'
						name={'name'}
						value={form.name}
						onChange={onChange}
						extraClass={'mb-6'}
						required={true}
						autoComplete={'name'}
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
				<div className={`${styles.row}`}>
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
