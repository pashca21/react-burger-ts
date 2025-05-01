import React from 'react';
import styles from './profile.module.css';
import { Link, NavLink, Outlet } from 'react-router-dom';

export const ProfilePage = (): JSX.Element => {
	return (
		<div className={`${styles.container}`}>
			<section className={styles.section + ' ' + styles.form}>
				<NavLink
					to={'/profile'}
					className={({ isActive }) =>
						(isActive ? styles.active : 'text_color_inactive') + ' mb-7'
					}>
					<p className='text text_type_main-large'>Профиль</p>
				</NavLink>
				<NavLink
					to={'/profile/orders'}
					className={({ isActive }) =>
						(isActive ? styles.active : 'text_color_inactive') + ' mb-7'
					}>
					<p className='text text_type_main-large'>История заказов</p>
				</NavLink>
				<Link to={'/logout'}>
					<p className='text text_type_main-large text_color_inactive'>Выход</p>
				</Link>
				<p className='mt-20 text text_type_main-default text_color_inactive'>
					В этом разделе вы можете изменить свои персональные данные
				</p>
			</section>
			<section className={styles.section}>
				<Outlet />
			</section>
		</div>
	);
};
