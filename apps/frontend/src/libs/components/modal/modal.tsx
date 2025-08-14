import { type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

import styles from "./styles.module.css";

type Properties = {
	children: ReactNode;
	isOpen: boolean;
	onClose: () => void;
	title: string;
};

const Modal = ({
	children,
	isOpen,
	onClose,
	title,
}: Properties): React.JSX.Element | null => {
	useEffect(() => {
		const handleEscape = (event: KeyboardEvent): void => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleEscape);
			document.body.style.overflow = "hidden";
		}

		return (): void => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "unset";
		};
	}, [isOpen, onClose]);

	if (!isOpen) {
		return null;
	}

	const handleBackdropClick = (
		event: React.MouseEvent<HTMLDivElement>,
	): void => {
		if (event.target === event.currentTarget) {
			onClose();
		}
	};

	return createPortal(
		<div className={styles["overlay"]} onClick={handleBackdropClick}>
			<div className={styles["modal"]}>
				<div className={styles["header"]}>
					<h2 className={styles["title"]}>{title}</h2>
					<button
						className={styles["close-button"]}
						onClick={onClose}
						type="button"
					>
						×
					</button>
				</div>
				<div className={styles["content"]}>{children}</div>
			</div>
		</div>,
		document.body,
	);
};

export { Modal };
