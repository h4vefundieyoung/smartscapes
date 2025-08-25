import debounce, { type DebouncedFunction } from "debounce";

import { useEffect, useMemo } from "~/libs/hooks/hooks.js";

const DEBOUNCE_DELAY_MS = 300;

const useDebouncedFunction = <T extends unknown[]>(
	function_: (...arguments_: T) => void,
	delay = DEBOUNCE_DELAY_MS,
): DebouncedFunction<(...arguments_: T) => void> => {
	const debouncedFunction = useMemo(
		() => debounce(function_, delay),
		[function_, delay],
	);

	useEffect(() => {
		return (): void => {
			debouncedFunction.clear();
		};
	}, [debouncedFunction]);

	return debouncedFunction;
};

export { useDebouncedFunction };
