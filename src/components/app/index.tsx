import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
	FeedPage,
} from '@pages/index';
import { AppHeader } from '@components/app-header/app-header';
import styles from './app.module.css';
import { useEffect } from 'react';
import { getIngredients } from '@services/actions/ingredients';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ProtectedRouteElement } from '@components/protected-route-element';
import { useAppDispatch } from '@hooks';
import { Orders } from '@components/orders/orders';
import { Profile } from '@components/profile/profile';
import { OrderPage } from '@pages/order/order';

export const App = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
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
							<Route path='/feed/:id' element={<OrderPage />} />
							<Route path='/feed' element={<FeedPage />} />
							<Route path='/profile/orders/:id' element={<OrderPage />} />
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
