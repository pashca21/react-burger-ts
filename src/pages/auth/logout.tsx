import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { logout } from '@services/actions/auth';
import { useAppDispatch, useAppSelector } from '@hooks/index';

export const LogoutPage = (): ReactNode => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { isAuth } = useAppSelector((state: any) => state.auth);
	if (!isAuth) {
		navigate('/');
	}

	const refreshToken = Cookies.get('refreshToken') || '';

	useEffect(() => {
		dispatch<any>(logout(refreshToken));
		navigate('/');
	}, [dispatch, navigate, refreshToken]);

	return (
		<div>
			<p>Выхожу...</p>
		</div>
	);
};
