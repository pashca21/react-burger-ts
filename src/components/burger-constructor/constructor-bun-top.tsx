import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '@hooks/index';
import { IIngredient } from '@interfaces/index';

export const ConstructorBunTop = (): JSX.Element | null => {
	const ingredient: IIngredient = useAppSelector(
		(state: any) => state.constructor.bun
	);
	if (!ingredient) return null;
	return (
		<ConstructorElement
			key={ingredient.uniqueId}
			type='top'
			isLocked={true}
			text={ingredient.name + ' (верх)'}
			price={ingredient.price}
			thumbnail={ingredient.image}
			extraClass={'ml-10 mt-4 mr-4'}
		/>
	);
};
