import styles from './modal-overlay.module.css';
import { IModalOverlay } from '@interfaces/index';
import { ReactNode } from 'react';

export const ModalOverlay = ({
	children,
	onClose,
}: IModalOverlay): ReactNode => {
	return (
		<div
			className={styles.modalOverlay}
			onClick={onClose}
			onKeyDown={onClose}
			role='presentation'>
			{children}
		</div>
	);
};
