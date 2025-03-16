import {
	Button,
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const AppHeader = () => (
	<header
		style={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			flexDirection: 'row',
			width: '100%',
		}}>
		<div
			style={{
				display: 'flex',
			}}>
			<Button
				htmlType='button'
				type='secondary'
				size='medium'
				style={{ display: 'flex', alignItems: 'center' }}
				extraClass={'mt-5 mb-4'}>
				<BurgerIcon type='secondary' className={'ml-5 mr-2'} />
				Конструктор
			</Button>
			<Button
				htmlType='button'
				type='secondary'
				size='medium'
				style={{ display: 'flex', alignItems: 'center' }}
				extraClass={'mt-5 mb-4'}>
				<ListIcon type='secondary' className={'ml-5 mr-2'} />
				Лента заказов
			</Button>
		</div>
		<div>
			<Logo />
		</div>
		<div>
			<Button
				htmlType='button'
				type='secondary'
				size='medium'
				style={{ display: 'flex', alignItems: 'center' }}
				extraClass={'mt-5 mb-4'}>
				<ProfileIcon type='secondary' className={'ml-5 mr-2'} />
				Личный кабинет
			</Button>
		</div>
	</header>
);
