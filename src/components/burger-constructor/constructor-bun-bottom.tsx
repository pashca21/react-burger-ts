import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '@hooks/index';
import { ReactNode } from 'react';

export const ConstructorBunBottom = (): ReactNode => {
	const ingredient = useAppSelector((state: any) => state.constructor.bun);
	if (!ingredient) return null;
	return (
		<ConstructorElement
			key={ingredient.uniqueId}
			type='bottom'
			isLocked={true}
			text={ingredient.name + ' (низ)'}
			price={ingredient.price}
			thumbnail={ingredient.image}
			extraClass={'ml-10 mt-4 mr-4'}
		/>
	);
};
