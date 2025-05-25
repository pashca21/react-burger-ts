import { ReactNode } from 'react';

export interface IModal {
	onClose: () => void;
	children: ReactNode;
	title: string;
}

export interface IModalOverlay {
	onClose: () => void;
	children: ReactNode;
}
