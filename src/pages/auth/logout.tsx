import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { logout } from '@services/actions/auth';
import { useAppDispatch, useAppSelector } from '@hooks';
import { TRootState } from '@utils/types';

export const LogoutPage = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { isAuth } = useAppSelector((state: TRootState) => state.auth);
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
