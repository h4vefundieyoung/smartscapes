import React from "react";

import { KeyboardKey } from "~/libs/enums/enums.js";
import {
	useCallback,
	useEffect,
	useModal,
	useRef,
} from "~/libs/hooks/hooks.js";

import { Icon } from "../components.js";
import styles from "./styles.module.css";

type ModalComponentProperties = ModalInjectedProperties &
	Record<string, unknown>;

interface ModalInjectedProperties {
	onClose?: () => void;
	registerCleanup?: (cleanupFunction: () => void) => void;
}

interface ModalProperties {
	children?: React.ReactNode;
	isOpen?: boolean;
	onClose?: () => void;
}

const Modal = ({
	isOpen: propertyIsOpen,
	onClose: propertyOnClose,
}: ModalProperties): null | React.JSX.Element => {
	const modalCleanupReference = useRef<(() => void) | null>(null);

	const globalModal = useModal({
		component: <></>,
		queryParameter: "",
		useGlobalState: true,
	});

	const isOpen = globalModal.isOpen || propertyIsOpen;
	const { component } = globalModal;
	const componentProperties = globalModal.modalProps as Record<string, unknown>;

	const hasValidComponent =
		component &&
		React.isValidElement(component) &&
		component.type !== React.Fragment;

	const handleClose = useCallback(() => {
		if (modalCleanupReference.current) {
			modalCleanupReference.current();
		}

		if (globalModal.isOpen) {
			globalModal.close();
		} else if (propertyOnClose) {
			propertyOnClose();
		}
	}, [globalModal, propertyOnClose]);

	const registerCleanup = useCallback((cleanupFunction: () => void) => {
		modalCleanupReference.current = cleanupFunction;
	}, []);

	useEffect(() => {
		if (!isOpen || !hasValidComponent) {
			return;
		}

		const handleKeyDown = (event: KeyboardEvent): void => {
			if (event.key === KeyboardKey.ESCAPE) {
				handleClose();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return (): void => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen, hasValidComponent, handleClose]);

	if (!isOpen || !hasValidComponent) {
		return null;
	}

	const modalContent = React.cloneElement(component, {
		...componentProperties,
		onClose: handleClose,
		registerCleanup,
	} as ModalComponentProperties);

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
