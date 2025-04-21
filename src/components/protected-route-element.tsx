import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import Cookies from 'js-cookie';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { updateAccessToken } from '@services/actions/auth';
import { getUserRequest } from '@services/api';

interface ProtectedRouteElementProps {
	element?: JSX.Element;
}

export const ProtectedRouteElement = (props: ProtectedRouteElementProps) => {
	const auth = useAppSelector((state: any) => state.auth);
	const [isUserLoaded, setUserLoaded] = useState(false);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { accessToken } = useAppSelector((state: any) => state.auth);

	const init = async () => {
		const refreshToken = Cookies.get('refreshToken');
		if (refreshToken) {
			try {
				await dispatch<any>(updateAccessToken(refreshToken));

				const userResponse = await getUserRequest(accessToken);
				if (!userResponse.success) {
					throw new Error('Не удалось получить данные пользователя');
				}
				setUserLoaded(true);
			} catch (error) {
				console.error('Ошибка при инициализации приложения:', error);
				navigate('/login');
			}
		} else {
			navigate('/login');
		}
	};

	useEffect(() => {
		init();
	}, []);

	if (!isUserLoaded) {
		return null;
	}

	return auth.user ? props.element : <Navigate to='/login' replace />;
};
