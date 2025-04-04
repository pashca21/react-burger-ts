import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

export const ConstructorBunTop = () => {
	const ingredient = useSelector((state: any) => state.constructor.bun);
	if (!ingredient) return null;
	return (
		<ConstructorElement
			key={ingredient._id + '_top'}
			type='top'
			isLocked={true}
			text={ingredient.name + ' (верх)'}
			price={ingredient.price}
			thumbnail={ingredient.image}
			extraClass={'ml-10 mt-4 mr-4'}
		/>
	);
};
