import { useCallback } from "react";
import { useSearchParams } from "react-router";

interface UseModalProps {
	queryParameter: string;
	component: React.ComponentType<any> | ((props: any) => React.JSX.Element);
	useGlobalState?: boolean;
	props?: Record<string, any>;
}

interface UseModalReturn {
	handleModalOpen: () => void;
}

interface UseModalGlobalReturn {
	isOpen: boolean;
	component: React.ComponentType<any> | null;
	modalProps: Record<string, any>;
	close: () => void;
	currentModal: string | null;
}

const modalRegistry: Record<
	string,
	React.ComponentType<any> | ((props: any) => React.JSX.Element)
> = {};

const modalPropsRegistry: Record<string, Record<string, any>> = {};

export const useModal = ({
	queryParameter,
	component,
	useGlobalState = false,
	props = {},
}: UseModalProps): any => {
	const [searchParams, setSearchParams] = useSearchParams();

	if (!useGlobalState && queryParameter && component) {
		modalRegistry[queryParameter] = component;
		modalPropsRegistry[queryParameter] = props;
	}

	const handleModalOpen = useCallback(() => {
		setSearchParams((prev) => {
			const newParams = new URLSearchParams(prev);
			newParams.set("modal", queryParameter);
			return newParams;
		});
	}, [queryParameter, setSearchParams]);

	const handleModalClose = useCallback(() => {
		setSearchParams((prev) => {
			const newParams = new URLSearchParams(prev);
			newParams.delete("modal");
			return newParams;
		});
	}, [setSearchParams]);

	if (useGlobalState) {
		const currentModalParam = searchParams.get("modal");
		const isOpen = Boolean(currentModalParam);
		const currentComponent = currentModalParam
			? modalRegistry[currentModalParam]
			: null;
		const currentModalProps = currentModalParam
			? modalPropsRegistry[currentModalParam] || {}
			: {};

		return {
			isOpen,
			component: currentComponent,
			modalProps: currentModalProps,
			close: handleModalClose,
			currentModal: currentModalParam,
		} as UseModalGlobalReturn;
	}

	return {
		handleModalOpen,
	} as UseModalReturn;
};
