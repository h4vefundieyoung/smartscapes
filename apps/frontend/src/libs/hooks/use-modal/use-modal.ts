import { type ReactElement } from "react";

import { useCallback, useSearchParams } from "~/libs/hooks/hooks.js";

interface GlobalModalState {
	close: () => void;
	component: null | ReactElement;
	currentModal: null | string;
	isOpen: boolean;
	modalProps: ModalProperties;
}

interface LocalModalState {
	handleModalOpen: () => void;
}

type ModalProperties = Record<string, unknown>;

interface UseModalOptions {
	component: ReactElement;
	queryParameter: string;
	useGlobalState?: boolean;
}

type UseModalReturn<TUseGlobalState extends boolean = false> =
	TUseGlobalState extends true ? GlobalModalState : LocalModalState;

const modalComponentRegistry: Record<string, ReactElement> = {};
const modalPropertiesRegistry: Record<string, ModalProperties> = {};

const useModal = <TUseGlobalState extends boolean = false>({
	component,
	queryParameter,
	useGlobalState = false as TUseGlobalState,
}: UseModalOptions & {
	useGlobalState?: TUseGlobalState;
}): UseModalReturn<TUseGlobalState> => {
	const [searchParameters, setSearchParameters] = useSearchParams();

	if (!useGlobalState) {
		modalComponentRegistry[queryParameter] = component;
		modalPropertiesRegistry[queryParameter] = {};
	}

	const handleModalOpen = useCallback(() => {
		setSearchParameters((previous) => {
			const newParameters = new URLSearchParams(previous);
			newParameters.set("modal", queryParameter);

			return newParameters;
		});
	}, [queryParameter, setSearchParameters]);

	const handleModalClose = useCallback(() => {
		setSearchParameters((previous) => {
			const newParameters = new URLSearchParams(previous);
			newParameters.delete("modal");

			return newParameters;
		});
	}, [setSearchParameters]);

	if (useGlobalState) {
		const currentModalParameter = searchParameters.get("modal");
		const isOpen = Boolean(currentModalParameter);
		const currentComponent = currentModalParameter
			? (modalComponentRegistry[currentModalParameter] as null | ReactElement)
			: null;
		const currentModalProperties = currentModalParameter
			? (modalPropertiesRegistry[currentModalParameter] ??
				({} as ModalProperties))
			: ({} as ModalProperties);

		return {
			close: handleModalClose,
			component: currentComponent,
			currentModal: currentModalParameter,
			isOpen,
			modalProps: currentModalProperties,
		} as UseModalReturn<TUseGlobalState>;
	}

	return {
		handleModalOpen,
	} as UseModalReturn<TUseGlobalState>;
};

export { useModal };
