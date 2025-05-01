import styles from './modal-overlay.module.css';
import { IModalOverlay } from '@interfaces/index';

export const ModalOverlay = ({
	children,
	onClose,
}: IModalOverlay): JSX.Element => {
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
