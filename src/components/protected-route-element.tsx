import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useAppSelector, useAppDispatch } from '@hooks/index';
import { getUser, updateAccessToken } from '@services/actions/auth';
import { IAuth } from '@interfaces/auth';

interface ProtectedRouteElementProps {
	element?: ReactNode;
}

export const ProtectedRouteElement = (props: ProtectedRouteElementProps) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const auth: IAuth = useAppSelector((state) => state.auth);
	const [isUserLoaded, setUserLoaded] = useState<boolean>(false);

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
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
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
				return;
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
