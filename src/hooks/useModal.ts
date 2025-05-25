import { useState, useCallback } from 'react';

export const useModal = (): {
	isModalOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
} => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const openModal = useCallback(() => {
		setIsModalOpen(true);
	}, []);

	const closeModal = useCallback(() => {
		setIsModalOpen(false);
	}, []);

	return {
		isModalOpen,
		openModal,
		closeModal,
	};
};
