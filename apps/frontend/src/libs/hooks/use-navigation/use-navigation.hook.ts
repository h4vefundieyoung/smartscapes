import { useCallback, useEffect, useRef, useState } from "react";

import { Navigation } from "~/libs/modules/navigation/navigation.module.js";
import { type Position } from "~/libs/modules/navigation/libs/types/types.js";

type NavigationState = {
	currentPosition: Position | null;
	error: string | null;
	isLoading: boolean;
};

type UseNavigationReturn = {
	getCurrentPosition: () => Promise<Position>;
	startWatchingPosition: () => void;
	stopWatchingPosition: () => void;
	state: NavigationState;
};

const useNavigation = (): UseNavigationReturn => {
	const navigationService = useRef(new Navigation());
	const watchIdRef = useRef<number | null>(null);

	const [state, setState] = useState<NavigationState>({
		currentPosition: null,
		error: null,
		isLoading: true,
	});

	const getCurrentPosition = useCallback(async (): Promise<Position> => {
		setState((previous) => ({
			...previous,
			error: null,
			isLoading: true,
		}));

		try {
			const position = await navigationService.current.getCurrentPosition();

			setState((previous) => ({
				...previous,
				currentPosition: position,
				error: null,
				isLoading: false,
			}));

			return position;
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Failed to get position";

			setState((previous) => ({
				...previous,
				error: errorMessage,
				isLoading: false,
			}));

			throw error;
		}
	}, []);

	const startWatchingPosition = useCallback((): void => {
		if (watchIdRef.current !== null) {
			return;
		}

		setState((previous) => ({
			...previous,
			error: null,
			isLoading: true,
		}));

		const handlePositionUpdate = (position: Position): void => {
			setState((previous) => ({
				...previous,
				currentPosition: position,
				error: null,
				isLoading: false,
			}));
		};

		watchIdRef.current =
			navigationService.current.watchPosition(handlePositionUpdate);
	}, []);

	const stopWatchingPosition = useCallback((): void => {
		if (watchIdRef.current !== null) {
			navigationService.current.clearWatch(watchIdRef.current);
			watchIdRef.current = null;
		}
	}, []);

	useEffect(() => {
		startWatchingPosition();

		return () => {
			stopWatchingPosition();
		};
	}, [startWatchingPosition, stopWatchingPosition]);

	return {
		getCurrentPosition,
		startWatchingPosition,
		stopWatchingPosition,
		state,
	};
};

export { useNavigation };
