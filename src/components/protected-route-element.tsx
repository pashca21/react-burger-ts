import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAppDispatch, useAppSelector } from '@hooks';
import { getUser, updateAccessToken } from '@services/actions/auth';
import { TRootState } from '@utils/types';

interface ProtectedRouteElementProps {
	element?: JSX.Element;
}

export const ProtectedRouteElement = (props: ProtectedRouteElementProps) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const { auth } = useAppSelector((state: TRootState) => state);
	const [isUserLoaded, setUserLoaded] = useState(false);

	const init = async () => {
		if (auth.user && auth.user.email && auth.isAuth) {
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
			if (auth.accessToken) {
				await dispatch<any>(getUser(auth.accessToken, refreshToken));
			}
		} catch {
			try {
				await dispatch<any>(updateAccessToken(refreshToken));
			} catch {
				navigate('/login', { state: { from: location } });
			}
			if (auth.accessToken) {
				await dispatch<any>(getUser(auth.accessToken, refreshToken));
			}
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
		auth.user?.email,
	]);

	if (!isUserLoaded || !auth.user?.email) {
		return (
			<div>
				<p>Загрузка...</p>
			</div>
		);
	}

	if (!auth.user?.email) {
		navigate('/login', { state: { from: location } });
		return;
	}

	return auth.user?.email ? (
		props.element
	) : (
		<Navigate to='/login' state={{ from: location }} replace />
	);
};
