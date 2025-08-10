import React from "react";

import { useEffect, useRef } from "~/libs/hooks/hooks.js";

import { Icon } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
};

const Modal = ({ children, isOpen, onClose }: Properties): React.JSX.Element => {
	const dialogReference = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogReference.current;

		if (!dialog) {
			return;
		}

		if (isOpen) {
			dialog.show();
		}
		else {
			dialog.close();
		}
	}, [isOpen]);

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const onKeyDown = (event: KeyboardEvent): void => {
			if (event.key === "Escape") { onClose(); }
		};

		document.addEventListener("keydown", onKeyDown);

		return (): void => {
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [isOpen, onClose]);

	return (
		<>
			{isOpen && (
				<div
					aria-hidden="true"
					className={styles["backdrop"]}
					onClick={onClose}
				/>
			)}

			<dialog
				className={styles["dialog"]}
				onCancel={onClose}
				ref={dialogReference}
			>
				<button
					aria-label="Close"
					className={styles["closeButton"]}
					onClick={onClose}
					type="button"
				>
					<Icon height={24} name="close" width={24} />
				</button>
				{children}
			</dialog>
		</>
	);
};

export { Modal };
