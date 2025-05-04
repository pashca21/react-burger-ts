import { ReactNode, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './app.module.css';
import { ProtectedRouteElement } from '@components/protected-route-element';
import { AppHeader } from '@components/app-header/app-header';
import { Profile } from '@components/profile/profile';
import { Orders } from '@components/orders/orders';
import {
	ForgotPasswordPage,
	HomePage,
	LoginPage,
	RegisterPage,
	ResetPasswordPage,
	NotFoundPage,
	ProfilePage,
	IngredientPage,
	LogoutPage,
} from '@pages/index';
import { getIngredients } from '@services/actions/ingredients';
import { useAppDispatch } from '@hooks/index';

export const App = (): ReactNode => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		dispatch<any>(getIngredients());
	}, [dispatch]);

	return (
		<BrowserRouter basename={'/'}>
			<div className={styles.index}>
				<AppHeader />
				<DndProvider backend={HTML5Backend}>
					<main className={styles.main}>
						<Routes>
							<Route path='/' element={<HomePage />} />
							<Route path='/ingredients/:id' element={<IngredientPage />} />
							<Route
								path='/profile'
								element={<ProtectedRouteElement element={<ProfilePage />} />}>
								<Route index element={<Profile />} />
								<Route path='orders' element={<Orders />} />
							</Route>
							<Route path='/login' element={<LoginPage />} />
							<Route path='/register' element={<RegisterPage />} />
							<Route path='/forgot-password' element={<ForgotPasswordPage />} />
							<Route path='/reset-password' element={<ResetPasswordPage />} />
							<Route
								path='/logout'
								element={<ProtectedRouteElement element={<LogoutPage />} />}
							/>
							<Route path='*' element={<NotFoundPage />} />
						</Routes>
					</main>
				</DndProvider>
			</div>
		</BrowserRouter>
	);
};
