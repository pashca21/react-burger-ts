import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { logout } from '@services/actions/auth';
import { useAppDispatch, useAppSelector } from '@hooks/index';

export const LogoutPage = (): JSX.Element => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { isAuth } = useAppSelector((state: any) => state.auth);
	if (!isAuth) navigate('/');

	const refreshToken = Cookies.get('refreshToken') || '';

	useEffect(() => {
		dispatch<any>(logout(refreshToken));
		navigate('/');
	}, [dispatch, navigate]);

	return (
		<div>
			<p>Выхожу...</p>
		</div>
	);
};
