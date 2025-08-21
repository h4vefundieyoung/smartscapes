import debounce, { type DebouncedFunction } from "debounce";
import { useEffect, useMemo } from "react";

const DEBOUNCE_DELAY_MS = 300;

const useDebounceCallback = <T extends unknown[]>(
	callback: (...arguments_: T) => void,
	delay = DEBOUNCE_DELAY_MS,
): DebouncedFunction<(...arguments_: T) => void> => {
	const debounced = useMemo(() => debounce(callback, delay), [callback, delay]);

	useEffect(() => {
		return (): void => {
			debounced.clear();
		};
	}, [debounced]);

	return debounced;
};

export { useDebounceCallback };
