import Cookies from 'js-cookie';
import { logout } from '@services/actions/auth';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';
import { useEffect } from 'react';

export const LogoutPage = () => {
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
