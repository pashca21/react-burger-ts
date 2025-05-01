import React from 'react';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { login } from '@services/actions/auth';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useForm } from '../../hooks/useForm';

export const LoginPage = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';

	const { isAuth } = useAppSelector((state: any) => state.auth);
	if (isAuth) navigate(from, { replace: true });

	const [values, onChange] = useForm<{ email: string; password: string }>({
		email: '',
		password: '',
	});

	const onClick = () => {
		if (!values.email || !values.password) {
			return;
		}
		dispatch<any>(login(values.email, values.password));
		navigate(from, { replace: true });
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
						value={values.email}
						onChange={onChange}
						extraClass={'mb-6'}
						required={true}
						autoComplete={'email'}
					/>
					<Input
						type='password'
						placeholder='Пароль'
						name='password'
						value={values.password}
						onChange={onChange}
						extraClass={'mb-6'}
						icon={'ShowIcon'}
						required={true}
						autoComplete={'current-password'}
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
