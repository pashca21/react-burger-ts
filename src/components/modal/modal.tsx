import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import { ModalProps } from '@utils/types';

export const Modal = ({ children, onClose, title }: ModalProps) => {
	useEffect(() => {
		const handleEscKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscKey);
		return () => {
			document.removeEventListener('keydown', handleEscKey);
		};
	}, [onClose]);

	return createPortal(
		<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
			<div className={styles.modalHeader}>
				<p className='text text_type_main-medium'>{title}</p>
				<button onClick={onClose}>
					<CloseIcon type='primary' />
				</button>
			</div>
			{children}
		</div>,
		document.getElementById('react-modals') as HTMLElement
	);
};
