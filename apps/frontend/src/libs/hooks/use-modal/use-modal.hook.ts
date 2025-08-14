import React, { type ComponentType, useCallback } from "react";
import { useSearchParams } from "react-router";

import { Modal } from "~/libs/components/components.js";

type UseModalProps = {
	component: ComponentType<{ onClose: () => void }>;
	title?: string;
	modalName: string;
};

type UseModalReturnType = {
	openModal: () => void;
	closeModal: () => void;
	isOpen: boolean;
	ModalComponent: () => React.JSX.Element | null;
};

const useModal = ({
	component,
	title = "",
	modalName,
}: UseModalProps): UseModalReturnType => {
	const [searchParams, setSearchParams] = useSearchParams();

	const isOpen = searchParams.get("modal") === modalName;

	const openModal = useCallback((): void => {
		setSearchParams((previous) => {
			const newParams = new URLSearchParams(previous);
			newParams.set("modal", modalName);
			return newParams;
		});
	}, [modalName, setSearchParams]);

	const closeModal = useCallback((): void => {
		setSearchParams((previous) => {
			const newParams = new URLSearchParams(previous);
			newParams.delete("modal");
			return newParams;
		});
	}, [setSearchParams]);

	const ModalComponent = (): React.JSX.Element | null => {
		if (!isOpen) {
			return null;
		}

		return React.createElement(Modal, {
			isOpen,
			onClose: closeModal,
			title,
			children: React.createElement(component, { onClose: closeModal }),
		});
	};

	return {
		openModal,
		closeModal,
		isOpen,
		ModalComponent,
	};
};

export { useModal };
