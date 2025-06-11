import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import { IModal } from '@utils/types';
import { ModalOverlay } from '@components/modal-overlay/modal-overlay';

export const Modal = ({ children, onClose, title }: IModal) => {
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
		<ModalOverlay onClose={onClose}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				<div className={styles.modalHeader}>
					<p className='text text_type_main-medium'>{title}</p>
					<div data-test="modal-close-icon">
						<CloseIcon type='primary' onClick={onClose} />
					</div>
				</div>
				{children}
			</div>
		</ModalOverlay>,
		document.getElementById('react-modals') as HTMLElement
	);
};
