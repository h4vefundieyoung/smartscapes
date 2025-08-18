import React, { Children } from "react";
import { useEffect, useRef } from "react";

import { KeyboardKey } from "~/libs/enums/enums.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { useModal } from "~/libs/hooks/use-modal/use-modal.js";

import { Icon } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	children?: React.ReactNode;
	isOpen?: boolean;
	onClose?: () => void;
};

const Modal = ({
	isOpen: propIsOpen,
	onClose: propOnClose,
}: Properties): null | React.JSX.Element => {
	const modalCleanupRef = useRef<(() => void) | null>(null);

	const globalModal = useModal({
		queryParameter: "",
		component: () => null,
		useGlobalState: true,
	});

	const isOpen = globalModal.isOpen || propIsOpen || false;
	const component = globalModal.component;
	const componentProps = globalModal.modalProps || {};

	const handleClose = useCallback(() => {
		if (modalCleanupRef.current) {
			modalCleanupRef.current();
		}

		if (globalModal.isOpen) {
			globalModal.close();
		} else if (propOnClose) {
			propOnClose();
		}
	}, [globalModal, propOnClose]);

	const registerCleanup = useCallback((cleanupFn: () => void) => {
		modalCleanupRef.current = cleanupFn;
	}, []);

	useEffect(() => {
		if (!isOpen) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === KeyboardKey.ESCAPE) {
				handleClose();
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, handleClose]);

	if (!isOpen) {
		return null;
	}

	const modalContent = component
		? React.createElement(component, {
				...componentProps,
				onClose: handleClose,
				registerCleanup,
			})
		: null;

	return (
		<>
			<div
				aria-hidden="true"
				className={styles["backdrop"]}
				onClick={handleClose}
			/>
			<div aria-modal="true" className={styles["dialog"]} role="dialog">
				<button
					aria-label="Close"
					className={styles["closeButton"]}
					onClick={handleClose}
					type="button"
				>
					<Icon height={24} name="close" width={24} />
				</button>
				{modalContent}
			</div>
		</>
	);
};

export { Modal };
