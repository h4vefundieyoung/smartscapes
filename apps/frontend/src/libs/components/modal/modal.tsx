import React from "react";

import { useCallback, useEffect } from "~/libs/hooks/hooks.js";

import { Icon } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
};

const Modal = ({
	children,
	isOpen,
	onClose,
}: Properties): React.JSX.Element => {
	useEffect((): (() => void) => {
		if (!isOpen) {
			return () => {};
		}

		const onKeyDown = (event: KeyboardEvent): void => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		document.addEventListener("keydown", onKeyDown);

		return (): void => {
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [isOpen, onClose]);

	const handleBackdropClick = useCallback((): void => {
		onClose();
	}, [onClose]);

	if (!isOpen) {
		return <></>;
	}

	return (
		<>
			<div
				aria-hidden="true"
				className={styles["backdrop"]}
				onClick={handleBackdropClick}
			/>
			<div aria-modal="true" className={styles["dialog"]} role="dialog">
				<button
					aria-label="Close"
					className={styles["closeButton"]}
					onClick={onClose}
					type="button"
				>
					<Icon height={24} name="close" width={24} />
				</button>
				{children}
			</div>
		</>
	);
};

export { Modal };
