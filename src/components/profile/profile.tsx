import styles from '@pages/profile/profile.module.css';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesCommon from '@styles/common.module.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { updateUser } from '@services/actions/auth';
import Cookies from 'js-cookie';

export const Profile = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { user } = useAppSelector((state: any) => state.auth);
	const { accessToken } = useAppSelector((state: any) => state.auth);

	const [isDataChanged, setIsDataChanged] = useState(false);

	const [form, setValue] = useState({
		name: user.name,
		email: user.email,
		password: '',
	});
	const onChange = (e: {
		target: {
			name: string;
			value: string;
		};
	}): void => {
		setValue({ ...form, [e.target.name]: e.target.value });
		if (
			user.name !== form.name ||
			user.email !== form.email ||
			user.password !== form.password
		) {
			setIsDataChanged(true);
		} else {
			setIsDataChanged(false);
		}
	};
	const saveUserData = (): void => {
		const refreshToken: string = Cookies.get('refreshToken') || '';
		dispatch<any>(
			updateUser(
				accessToken,
				refreshToken,
				form.name,
				form.email,
				form.password
			)
		);
		navigate('/');
	};

	const cancelSaveUserData = (): void => {
		setValue({ name: user.name, email: user.email, password: '' });
		setIsDataChanged(false);
	};

	useEffect(() => {
		setValue({ name: user.name, email: user.email, password: '' });
	}, [user]);

	return (
		<div className={`${styles.form}`}>
			<form className={`${styles.form}`}>
				<Input
					type='text'
					placeholder='Имя'
					name='name'
					value={form.name}
					onChange={onChange}
					extraClass={'mb-6'}
					icon={'EditIcon'}
					autoComplete={'name'}
				/>
				<Input
					type='email'
					placeholder='Логин'
					name='email'
					value={form.email}
					onChange={onChange}
					extraClass={'mb-6'}
					icon={'EditIcon'}
					autoComplete={'email'}
				/>
				<Input
					type='password'
					placeholder='Пароль'
					name='password'
					value={form.password}
					onChange={onChange}
					extraClass={'mb-6'}
					icon={'EditIcon'}
					autoComplete={'current-password'}
				/>
				{isDataChanged && (
					<div className={stylesCommon.row_between}>
						<Button
							type='secondary'
							htmlType='button'
							onClick={cancelSaveUserData}
							extraClass={'mb-20'}
							size='large'>
							Отмена
						</Button>
						<Button
							type='primary'
							htmlType='button'
							onClick={saveUserData}
							extraClass={'mb-20'}
							size='large'>
							Сохранить
						</Button>
					</div>
				)}
			</form>
		</div>
	);
};
