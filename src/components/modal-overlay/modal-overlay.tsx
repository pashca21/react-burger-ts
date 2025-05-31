import styles from './modal-overlay.module.css';
import { IModalOverlay } from '@utils/types';

export const ModalOverlay = ({ children, onClose }: IModalOverlay) => {
	return (
		<div className={styles.modalOverlay} onClick={onClose}>
			{children}
		</div>
	);
};
