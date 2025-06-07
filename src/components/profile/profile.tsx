import styles from '@pages/profile/profile.module.css';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesCommon from '../../styles/common.module.css';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { updateUser } from '@services/actions/auth';
import Cookies from 'js-cookie';
import { TRootState } from '@utils/types';

export const Profile = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { user, accessToken } = useAppSelector(
		(state: TRootState) => state.auth
	);

	const [isDataChanged, setIsDataChanged] = useState(false);

	const [form, setValue] = useState({
		name: user?.name,
		email: user?.email,
		password: '',
	});
	const onChange = (e: {
		target: {
			name: string;
			value: string;
		};
	}) => {
		setValue({ ...form, [e.target.name]: e.target.value });
		if (
			user?.name !== form.name ||
			user?.email !== form.email ||
			user?.password !== form.password
		) {
			setIsDataChanged(true);
		} else {
			setIsDataChanged(false);
		}
	};
	const saveUserData = () => {
		const refreshToken = Cookies.get('refreshToken') || '';
		if (!refreshToken) {
			navigate('/login');
			return;
		}
		if (accessToken) {
			dispatch<any>(
				updateUser(
					accessToken,
					refreshToken,
					form?.name ?? '',
					form?.email ?? '',
					form?.password ?? ''
				)
			);
		}
		navigate('/');
	};

	const cancelSaveUserData = () => {
		setValue({
			name: user?.name ?? '',
			email: user?.email ?? '',
			password: '',
		});
		setIsDataChanged(false);
	};

	useEffect(() => {
		setValue({
			name: user?.name ?? '',
			email: user?.email ?? '',
			password: '',
		});
	}, [user?.name, user?.email]);

	return (
		<div className={`${styles.form}`}>
			<form className={`${styles.form}`}>
				<Input
					type='text'
					placeholder='Имя'
					name='name'
					value={form?.name ?? ''}
					onChange={onChange}
					extraClass={'mb-6'}
					icon={'EditIcon'}
					autoComplete={'name'}
				/>
				<Input
					type='email'
					placeholder='Логин'
					name='email'
					value={form?.email ?? ''}
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
