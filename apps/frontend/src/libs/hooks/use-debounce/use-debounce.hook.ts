import { useEffect, useState } from "react";

const DEBOUNCE_DELAY_MS = 300;

const useDebounce = <T>(value: T, delay = DEBOUNCE_DELAY_MS): T => {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return (): void => {
			clearTimeout(timeout);
		};
	}, [value, delay]);

	return debouncedValue;
};

export { useDebounce };
