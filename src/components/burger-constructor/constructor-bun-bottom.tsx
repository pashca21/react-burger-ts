import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '@hooks';
import { TRootState } from '@utils/types';

export const ConstructorBunBottom = () => {
	const ingredient = useAppSelector(
		(state: TRootState) => state.constructor.bun
	);
	if (!ingredient) {
		return null;
	}
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
