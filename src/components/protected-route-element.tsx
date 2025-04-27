import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import Cookies from 'js-cookie';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { getUser, updateAccessToken } from '@services/actions/auth';

interface ProtectedRouteElementProps {
	element?: JSX.Element;
}

export const ProtectedRouteElement = (props: ProtectedRouteElementProps) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const auth = useAppSelector((state: any) => state.auth);
	const [isUserLoaded, setUserLoaded] = useState(false);

	const init = async () => {
		if (auth.user.email) {
			setUserLoaded(true);
			return;
		}
		const refreshToken = Cookies.get('refreshToken') || '';

		if (!refreshToken) {
			navigate('/login');
			return;
		}

		const accessTokenValid = new Date(auth.accessTokenExpiresAt) > new Date();

		if (refreshToken && !accessTokenValid) {
			try {
				await dispatch<any>(updateAccessToken(refreshToken));
			} catch (error) {
				navigate('/login');
				return;
			}
		}

		if (auth.accessToken || accessTokenValid) {
			try {
				await dispatch<any>(getUser(auth.accessToken));
				setUserLoaded(true);
			} catch (error) {
				navigate('/login');
			}
		}
	};

	useEffect(() => {
		init();
	}, [
		dispatch,
		navigate,
		auth.accessToken,
		auth.accessTokenExpiresAt,
		auth.user.email,
	]);

	if (!isUserLoaded || !auth.user.email) {
		return (
			<div>
				<p>Загрузка...</p>
			</div>
		);
	}

	return auth.user.email ? props.element : <Navigate to='/login' replace />;
};
