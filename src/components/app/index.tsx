import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
	ForgotPasswordPage,
	HomePage,
	LoginPage,
	RegisterPage,
	ResetPasswordPage,
	NotFoundPage,
	ProfilePage,
	IngredientPage, OrdersPage,
} from '@pages/index';
import { AppHeader } from '@components/app-header/app-header';
import styles from './app.module.css';
import { useEffect } from 'react';
import { getIngredients } from '@services/actions/ingredients';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { ProtectedRouteElement } from '@components/protected-route-element';

export const App = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch<any>(getIngredients());
	}, [dispatch]);

	return (
		<BrowserRouter>
			<div className={styles.index}>
				<AppHeader />
				<DndProvider backend={HTML5Backend}>
					<main className={styles.main}>
						<Routes>
							<Route path='/' element={<HomePage />} />
							<Route
								path='/profile'
								element={<ProtectedRouteElement element={<ProfilePage />} />}>
								<Route path='orders' element={<OrdersPage />} />
							</Route>
							<Route path='/ingredients/:id' element={<IngredientPage />} />
							<Route path='/login' element={<LoginPage />} />
							<Route path='/register' element={<RegisterPage />} />
							<Route path='/forgot-password' element={<ForgotPasswordPage />} />
							<Route path='/reset-password' element={<ResetPasswordPage />} />
							<Route path='*' element={<NotFoundPage />} />
						</Routes>
					</main>
				</DndProvider>
			</div>
		</BrowserRouter>
	);
};
