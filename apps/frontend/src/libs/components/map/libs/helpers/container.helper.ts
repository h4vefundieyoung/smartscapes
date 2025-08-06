import { MAP_PARAMETERS } from "../consts/consts.js";

const isContainerReady = (container: HTMLDivElement | null): boolean => {
	if (!container) {
		return false;
	}

	if (!container.isConnected) {
		return false;
	}

	return Boolean(container.offsetWidth && container.offsetHeight);
};

const setupContainerRetry = (
	container: HTMLDivElement | null,
	onRetry: () => void,
): (() => void) => {
	if (!container || typeof onRetry !== "function") {
		return (): void => {};
	}

	const retryTimeout = setTimeout(() => {
		if (isContainerReady(container)) {
			onRetry();
		}
	}, MAP_PARAMETERS.CONTAINER_RETRY_DELAY);

	return (): void => {
		clearTimeout(retryTimeout);
	};
};

export { isContainerReady, setupContainerRetry };
