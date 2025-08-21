import debounce, { type DebouncedFunction } from "debounce";

import { useEffect, useMemo } from "~/libs/hooks/hooks.js";

const DEBOUNCE_DELAY_MS = 300;

const useDebouncedCallback = <T extends unknown[]>(
	callback: (...arguments_: T) => void,
	delay = DEBOUNCE_DELAY_MS,
): DebouncedFunction<(...arguments_: T) => void> => {
	const debouncedFunction = useMemo(
		() => debounce(callback, delay),
		[callback, delay],
	);

	useEffect(() => {
		return (): void => {
			debouncedFunction.clear();
		};
	}, [debouncedFunction]);

	return debouncedFunction;
};

export { useDebouncedCallback };
