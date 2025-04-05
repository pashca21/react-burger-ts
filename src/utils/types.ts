import { Key, ReactNode } from 'react';

export interface IngredientProps {
	uniqueId?: string;
	_id: Key | null | undefined;
	name: string;
	type: string;
	image: string;
	image_mobile: string;
	image_large: string;
	price: number;
	calories: number;
	proteins: number;
	fat: number;
	carbohydrates: number;
	__v: number;
}

export interface ModalProps {
	onClose: () => void;
	children: React.ReactNode;
	title: string;
}

export interface ModalOverlayProps {
	onClose: () => void;
	children: ReactNode;
}
