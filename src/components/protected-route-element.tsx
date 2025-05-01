import { Navigate, useLocation, useNavigate } from 'react-router-dom';
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
	const location = useLocation();
	const auth = useAppSelector((state: any) => state.auth);
	const [isUserLoaded, setUserLoaded] = useState(false);

	const init = async () => {
		if (auth.user.email && auth.isAuth) {
			setUserLoaded(true);
			return;
		}

		const refreshToken = Cookies.get('refreshToken') || '';

		if (!refreshToken) {
			navigate('/login', { state: { from: location } });
			return;
		}

		let needToUpdateAccessToken = false;

		if (!auth.accessToken) {
			needToUpdateAccessToken = true;
		}

		if (auth.accessToken && auth.accessTokenExpiresAt) {
			const accessToken = auth.accessToken;
			const accessTokenExpiresAt = new Date(auth.accessTokenExpiresAt);
			if (accessToken && accessTokenExpiresAt) {
				needToUpdateAccessToken = false;
			}
		}

		if (refreshToken && needToUpdateAccessToken) {
			try {
				await dispatch<any>(updateAccessToken(refreshToken));
			} catch {
				navigate('/login', { state: { from: location } });
				return;
			}
		}

		try {
			await dispatch<any>(getUser(auth.accessToken, refreshToken));
		} catch {
			try {
				await dispatch<any>(updateAccessToken(refreshToken));
			} catch {
				navigate('/login', { state: { from: location } });
			}
			await dispatch<any>(getUser(auth.accessToken, refreshToken));
		}
		setUserLoaded(true);
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

	return auth.user.email ? (
		props.element
	) : (
		<Navigate to='/login' state={{ from: location }} replace />
	);
};
