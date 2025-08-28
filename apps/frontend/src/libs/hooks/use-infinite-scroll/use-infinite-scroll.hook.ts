import { useCallback, useEffect, useRef } from "~/libs/hooks/hooks.js";

type UseInfiniteScrollOptions = {
	hasNextPage: boolean;
	isLoading: boolean;
	onLoadMore: () => void;
	threshold?: number;
};

type UseInfiniteScrollReturn = {
	elementReference: (node: HTMLElement | null) => void;
};

const DEFAULT_THRESHOLD = 1;

const useInfiniteScroll = ({
	hasNextPage,
	isLoading,
	onLoadMore,
	threshold = DEFAULT_THRESHOLD,
}: UseInfiniteScrollOptions): UseInfiniteScrollReturn => {
	const observer = useRef<IntersectionObserver | null>(null);

	const elementReference = useCallback(
		(node: HTMLElement | null) => {
			if (isLoading) {
				return;
			}

			if (observer.current) {
				observer.current.disconnect();
			}

			observer.current = new IntersectionObserver(
				(entries) => {
					if (entries[0]?.isIntersecting && hasNextPage) {
						onLoadMore();
					}
				},
				{
					threshold,
				},
			);

			if (node) {
				observer.current.observe(node);
			}
		},
		[isLoading, hasNextPage, onLoadMore, threshold],
	);

	useEffect((): (() => void) => {
		return (): void => {
			if (observer.current) {
				observer.current.disconnect();
			}
		};
	}, []);

	return { elementReference };
};

export { useInfiniteScroll };
