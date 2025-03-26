import styles from './modal-overlay.module.css';
import { ModalOverlayProps } from '@utils/types';

export const ModalOverlay = ({ children, onClose }: ModalOverlayProps) => {
	return (
		<div className={styles.modalOverlay} onClick={onClose}>
			{children}
		</div>
	);
};
